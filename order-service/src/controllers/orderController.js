const { request } = require('../../../shared/httpClient');
const { ok, fail } = require('../../../shared/response');
const { createOrder, listOrders, findOrder, updateOrderStatus } = require('../models/orderModel');
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

const getOrders = (_req, res) => res.json(ok(listOrders()));

const getOrder = (req, res) => {
  const order = findOrder(req.params.id);
  if (!order) return res.status(404).json(fail('order not found'));
  return res.json(ok(order));
};

const patchOrderStatus = (req, res) => {
  const { status } = req.body || {};
  if (!status) return res.status(400).json(fail('status is required'));
  const order = updateOrderStatus(req.params.id, status);
  if (!order) return res.status(404).json(fail('order not found'));
  return res.json(ok(order));
};

module.exports = { create, getOrders, getOrder, patchOrderStatus };
