const { request } = require('../../../shared/httpClient');

const createOrder = async (req, res) => {
  try {
    const data = await request('api-gateway', 'POST', 'http://order-service:3002/orders', req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
};

const listOrders = async (_req, res) => {
  try {
    const data = await request('api-gateway', 'GET', 'http://order-service:3002/orders');
    res.json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const data = await request('api-gateway', 'GET', `http://order-service:3002/orders/${req.params.id}`);
    res.status(data.success ? 200 : 404).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
};

const listUsers = async (_req, res) => {
  try {
    const data = await request('api-gateway', 'GET', 'http://user-service:3001/users');
    res.json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
};

const listPayments = async (_req, res) => {
  try {
    const data = await request('api-gateway', 'GET', 'http://payment-service:3003/payments');
    res.json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
};

const listNotifications = async (_req, res) => {
  try {
    const data = await request('api-gateway', 'GET', 'http://notification-service:3004/notifications');
    res.json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
};

module.exports = { createOrder, listOrders, getOrder, listUsers, listPayments, listNotifications };
