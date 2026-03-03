const express = require('express');
const {
  send,
  getNotifications,
  getNotificationsByUser,
  getNotificationsByOrder,
  getNotification,
} = require('../controllers/notificationController');

const router = express.Router();
router.get('/notifications', getNotifications);
router.get('/notifications/user/:userId', getNotificationsByUser);
router.get('/notifications/order/:orderId', getNotificationsByOrder);
router.get('/notifications/:id', getNotification);
router.post('/notifications/send', send);

module.exports = router;
