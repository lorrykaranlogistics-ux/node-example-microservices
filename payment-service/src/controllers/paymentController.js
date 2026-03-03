const { validatePayment } = require('../utils/paymentValidator');
const { createPayment, listPayments, findPayment } = require('../models/paymentModel');
const { ok, fail } = require('../../../shared/response');

const authorizePayment = (req, res) => {
  try {
    const { parsedAmount } = validatePayment(req.body);
    const payment = createPayment({ ...req.body, amount: parsedAmount });
    return res.status(201).json(ok(payment));
  } catch (err) {
    return res.status(400).json(fail(err.message));
  }
};

const getPayments = (_req, res) => res.json(ok(listPayments()));

const getPayment = (req, res) => {
  const payment = findPayment(req.params.id);
  if (!payment) return res.status(404).json(fail('payment not found'));
  return res.json(ok(payment));
};

module.exports = { authorizePayment, getPayments, getPayment };
