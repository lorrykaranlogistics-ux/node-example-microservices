const assert = require("assert");
const {
  paymentAuthorizeRequestSchema,
  paymentAuthorizeResponseSchema,
  validateAgainstSchema,
} = require("../shared/contractSchemas");

function testPaymentRequestContractAcceptsValidPayload() {
  const payload = {
    cardNumber: "4242424242424242",
    amount: 120.55,
    currency: "USD",
  };
  const errors = validateAgainstSchema(payload, paymentAuthorizeRequestSchema);
  assert.deepStrictEqual(errors, []);
}

function testPaymentRequestContractRejectsUnexpectedField() {
  const payload = {
    cardNumber: "4242424242424242",
    amount: 120.55,
    currency: "USD",
    customerId: "c1",
  };
  const errors = validateAgainstSchema(payload, paymentAuthorizeRequestSchema);
  assert.ok(errors.some((e) => e.includes("customerId is not allowed")));
}

function testPaymentResponseContractAcceptsProviderShape() {
  const payload = {
    id: "p_10",
    status: "APPROVED",
    cardNumber: "4242424242424242",
    amount: 120.55,
    currency: "USD",
  };
  const errors = validateAgainstSchema(payload, paymentAuthorizeResponseSchema);
  assert.deepStrictEqual(errors, []);
}

function testPaymentResponseContractRejectsBreakingStatusChange() {
  const payload = {
    id: "p_10",
    status: "APPROVED1",
    cardNumber: "4242424242424242",
    amount: 120.55,
    currency: "USD",
  };
  const errors = validateAgainstSchema(payload, paymentAuthorizeResponseSchema);
  assert.ok(errors.some((e) => e.includes("must be one of [APPROVED]")));
}

function run() {
  const tests = [
    testPaymentRequestContractAcceptsValidPayload,
    testPaymentRequestContractRejectsUnexpectedField,
    testPaymentResponseContractAcceptsProviderShape,
    testPaymentResponseContractRejectsBreakingStatusChange,
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
  if (failed > 0) process.exit(1);
}

run();
