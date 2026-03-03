const express = require('express');
const {
  createOrder,
  listOrders,
  getOrder,
  listUsers,
  listPayments,
  listNotifications,
} = require('../controllers/gatewayController');

const router = express.Router();
router.get('/api/orders', listOrders);
router.get('/api/orders/:id', getOrder);
router.post('/api/orders', createOrder);
router.get('/api/users', listUsers);
router.get('/api/payments', listPayments);
router.get('/api/notifications', listNotifications);

module.exports = router;
