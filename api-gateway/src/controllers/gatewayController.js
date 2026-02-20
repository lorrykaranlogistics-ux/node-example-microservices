const { request } = require('../../../shared/httpClient');

const createOrder = async (req, res) => {
  try {
    const data = await request('api-gateway', 'POST', 'http://order-service:3002/orders', req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
};

module.exports = { createOrder };
