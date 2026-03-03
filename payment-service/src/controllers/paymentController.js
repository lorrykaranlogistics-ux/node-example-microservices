const { validatePayment } = require('../utils/paymentValidator');
const { createPayment, listPayments, listPaymentsByStatus, findPayment, updatePaymentStatus } = require('../models/paymentModel');
const { ok, fail } = require('../../../shared/response');
const {
  paymentAuthorizeRequestSchema,
  paymentAuthorizeResponseSchema,
  validateAgainstSchema,
} = require('../../../shared/contractSchemas');

const authorizePayment = (req, res) => {
  try {
    const requestErrors = validateAgainstSchema(req.body || {}, paymentAuthorizeRequestSchema);
    if (requestErrors.length > 0) {
      return res.status(400).json(fail(`payment request contract mismatch: ${requestErrors.join('; ')}`));
    }

    const { parsedAmount } = validatePayment(req.body);
    const payment = createPayment({ ...req.body, amount: parsedAmount });

    const responseErrors = validateAgainstSchema(payment, paymentAuthorizeResponseSchema);
    if (responseErrors.length > 0) {
      return res.status(500).json(fail(`payment response contract mismatch: ${responseErrors.join('; ')}`));
    }

    return res.status(201).json(ok(payment));
  } catch (err) {
    return res.status(400).json(fail(err.message));
  }
};

const getPayments = (_req, res) => res.json(ok(listPayments()));
const getPaymentsByStatus = (req, res) => res.json(ok(listPaymentsByStatus(req.params.status)));

const getPayment = (req, res) => {
  const payment = findPayment(req.params.id);
  if (!payment) return res.status(404).json(fail('payment not found'));
  return res.json(ok(payment));
};

const refundPayment = (req, res) => {
  const payment = updatePaymentStatus(req.params.id, 'REFUNDED');
  if (!payment) return res.status(404).json(fail('payment not found'));
  return res.json(ok(payment));
};

module.exports = { authorizePayment, getPayments, getPaymentsByStatus, getPayment, refundPayment };
