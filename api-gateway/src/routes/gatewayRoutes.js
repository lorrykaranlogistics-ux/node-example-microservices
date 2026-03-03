const express = require('express');
const {
  createOrder,
  patchOrderStatus,
  cancelOrder,
  listOrders,
  listOrdersByUser,
  getOrder,
  createUser,
  listUsers,
  listUsersByTier,
  getUser,
  listPayments,
  listPaymentsByStatus,
  getPayment,
  refundPayment,
  listNotifications,
  listNotificationsByUser,
  listNotificationsByOrder,
  getNotification,
} = require('../controllers/gatewayController');

const router = express.Router();
router.get('/api/orders', listOrders);
router.get('/api/orders/user/:userId', listOrdersByUser);
router.get('/api/orders/:id', getOrder);
router.post('/api/orders', createOrder);
router.patch('/api/orders/:id/status', patchOrderStatus);
router.post('/api/orders/:id/cancel', cancelOrder);
router.get('/api/users', listUsers);
router.get('/api/users/tier/:tier', listUsersByTier);
router.get('/api/users/:id', getUser);
router.post('/api/users', createUser);
router.get('/api/payments', listPayments);
router.get('/api/payments/status/:status', listPaymentsByStatus);
router.get('/api/payments/:id', getPayment);
router.post('/api/payments/:id/refund', refundPayment);
router.get('/api/notifications', listNotifications);
router.get('/api/notifications/user/:userId', listNotificationsByUser);
router.get('/api/notifications/order/:orderId', listNotificationsByOrder);
router.get('/api/notifications/:id', getNotification);

module.exports = router;
