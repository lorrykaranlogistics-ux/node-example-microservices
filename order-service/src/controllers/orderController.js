const { request } = require('../../../shared/httpClient');
const { ok, fail } = require('../../../shared/response');
const { createOrder } = require('../models/orderModel');
const { buildNotificationPayload } = require('../utils/orderUtils');

const create = async (req, res) => {
  try {
    const { userId, cardNumber, amount, currency } = req.body;

    const userRes = await request('order-service', 'GET', `http://user-service:3001/users/${userId}`);
    if (!userRes.success) {
      return res.status(404).json(fail('user not found'));
    }

    const paymentRes = await request('order-service', 'POST', 'http://payment-service:3003/payments/authorize', {
      cardNumber,
      amount,
      currency,
    });

    const order = createOrder({
      userId,
      amount,
      currency,
      paymentId: paymentRes.data.id,
      transactionRef: paymentRes.data.id,
    });

    await request('order-service', 'POST', 'http://notification-service:3004/notifications/send', buildNotificationPayload(order));

    return res.status(201).json(ok(order));
  } catch (err) {
    return res.status(500).json(fail(err.message));
  }
};

module.exports = { create };
