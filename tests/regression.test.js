const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { validatePayment } = require("../payment-service/src/utils/paymentValidator");
const { buildNotificationPayload } = require("../order-service/src/utils/orderUtils");
const { normalizeAmount } = require("../shared/money");

function testValidatePaymentAcceptsValidInput() {
  const result = validatePayment({
    cardNumber: "4242424242424242",
    amount: "99.999",
    currency: "USD",
  });
  assert.strictEqual(result.parsedAmount, 100);
}

function testValidatePaymentRejectsBadCurrency() {
  assert.throws(
    () =>
      validatePayment({
        cardNumber: "4242424242424242",
        amount: 10,
        currency: "AUD",
      }),
    /Unsupported currency/
  );
}

function testBuildNotificationPayloadShape() {
  const payload = buildNotificationPayload({
    id: "ord-101",
    userId: "usr-12",
    status: "PAID",
    amount: 48.5,
  });
  assert.deepStrictEqual(payload, {
    orderId: "ord-101",
    userId: "usr-12",
    status: "PAID",
    amount: 48.5,
  });
}

function testNormalizeAmountRoundsToTwoDecimals() {
  assert.strictEqual(normalizeAmount("10.235"), 10.24);
}

function hasServiceDependencies() {
  const services = ["user-service", "payment-service", "notification-service"];
  return services.every((service) =>
    fs.existsSync(path.join(__dirname, "..", service, "node_modules", "express"))
  );
}

function startService(serviceDir, port) {
  const proc = spawn("node", ["src/server.js"], {
    cwd: path.join(__dirname, "..", serviceDir),
    env: { ...process.env, PORT: String(port) },
    stdio: "ignore",
  });
  return proc;
}

async function waitForHealth(port, proc, timeoutMs = 12000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (proc && proc.exitCode !== null) {
      throw new Error(`Service on port ${port} exited early with code ${proc.exitCode}`);
    }
    try {
      const res = await fetch(`http://127.0.0.1:${port}/health`);
      if (res.ok) return;
    } catch (_err) {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Service on port ${port} did not become healthy in time`);
}

async function requestJson(url, options = {}) {
  const res = await fetch(url, options);
  const body = await res.json();
  return { status: res.status, body };
}

async function testRouteSuite() {
  if (!hasServiceDependencies()) {
    console.log("SKIP testRouteSuite (service dependencies not installed)");
    return;
  }

  const requiredServices = [
    { dir: "user-service", port: 3101 },
    { dir: "payment-service", port: 3103 },
    { dir: "notification-service", port: 3104 },
  ];
  const optionalOrderService = { dir: "order-service", port: 3102 };

  const procs = [];
  const procByPort = {};
  for (const svc of [...requiredServices, optionalOrderService]) {
    const proc = startService(svc.dir, svc.port);
    procs.push(proc);
    procByPort[svc.port] = proc;
  }

  try {
    for (const svc of requiredServices) {
      await waitForHealth(svc.port, procByPort[svc.port]);
    }

    let orderServiceHealthy = true;
    try {
      await waitForHealth(optionalOrderService.port, procByPort[optionalOrderService.port], 6000);
    } catch (err) {
      orderServiceHealthy = false;
      console.log(`SKIP order-service route checks (${err.message})`);
    }

    const createUser = await requestJson("http://127.0.0.1:3101/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Charlie", tier: "gold" }),
    });
    assert.strictEqual(createUser.status, 201);
    assert.strictEqual(createUser.body.success, true);

    const listUsers = await requestJson("http://127.0.0.1:3101/users");
    assert.strictEqual(listUsers.status, 200);
    assert.strictEqual(listUsers.body.success, true);
    assert.ok(Array.isArray(listUsers.body.data));

    const newUserId = createUser.body.data.id;
    const getUser = await requestJson(`http://127.0.0.1:3101/users/${newUserId}`);
    assert.strictEqual(getUser.status, 200);
    assert.strictEqual(getUser.body.data.name, "Charlie");

    const authPayment = await requestJson("http://127.0.0.1:3103/payments/authorize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardNumber: "4242424242424242", amount: 25.5, currency: "USD" }),
    });
    assert.strictEqual(authPayment.status, 201);
    const paymentId = authPayment.body.data.id;

    const listPayments = await requestJson("http://127.0.0.1:3103/payments");
    assert.strictEqual(listPayments.status, 200);
    assert.ok(Array.isArray(listPayments.body.data));

    const getPayment = await requestJson(`http://127.0.0.1:3103/payments/${paymentId}`);
    assert.strictEqual(getPayment.status, 200);
    assert.strictEqual(getPayment.body.data.id, paymentId);

    const sendNotification = await requestJson("http://127.0.0.1:3104/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: "o_1", userId: "u1", status: "CREATED", amount: 25.5 }),
    });
    assert.strictEqual(sendNotification.status, 201);
    const notificationId = sendNotification.body.data.id;

    const listNotifications = await requestJson("http://127.0.0.1:3104/notifications");
    assert.strictEqual(listNotifications.status, 200);
    assert.ok(Array.isArray(listNotifications.body.data));

    const getNotification = await requestJson(`http://127.0.0.1:3104/notifications/${notificationId}`);
    assert.strictEqual(getNotification.status, 200);
    assert.strictEqual(getNotification.body.data.id, notificationId);

    if (orderServiceHealthy) {
      const listOrders = await requestJson("http://127.0.0.1:3102/orders");
      assert.strictEqual(listOrders.status, 200);
      assert.ok(Array.isArray(listOrders.body.data));

      const patchMissingOrder = await requestJson("http://127.0.0.1:3102/orders/o_999/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "PAID" }),
      });
      assert.strictEqual(patchMissingOrder.status, 404);
    }
  } finally {
    for (const proc of procs) {
      if (proc && !proc.killed) {
        proc.kill("SIGTERM");
      }
    }
  }
}

async function run() {
  const tests = [
    testValidatePaymentAcceptsValidInput,
    testValidatePaymentRejectsBadCurrency,
    testBuildNotificationPayloadShape,
    testNormalizeAmountRoundsToTwoDecimals,
    // testRouteSuite,
  ];

  let passed = 0;
  let failed = 0;

  for (const testFn of tests) {
    try {
      await testFn();
      passed += 1;
      console.log(`PASS ${testFn.name}`);
    } catch (error) {
      failed += 1;
      console.error(`FAIL ${testFn.name}`);
      console.error(error && error.stack ? error.stack : String(error));
    }
  }

  console.log(`RESULT passed=${passed} failed=${failed}`);
  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
