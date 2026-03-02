const assert = require("assert");
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

function run() {
  const tests = [
    testValidatePaymentAcceptsValidInput,
    testValidatePaymentRejectsBadCurrency,
    testBuildNotificationPayloadShape,
    testNormalizeAmountRoundsToTwoDecimals,
  ];

  let passed = 0;
  let failed = 0;

  for (const testFn of tests) {
    try {
      testFn();
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

run();
