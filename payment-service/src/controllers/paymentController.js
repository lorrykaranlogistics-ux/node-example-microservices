const { validatePayment } = require('../utils/paymentValidator');
const { createPayment } = require('../models/paymentModel');
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

module.exports = { authorizePayment };
