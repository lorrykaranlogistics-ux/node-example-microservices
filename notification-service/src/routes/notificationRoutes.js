const express = require('express');
const { send, getNotifications, getNotification } = require('../controllers/notificationController');

const router = express.Router();
router.get('/notifications', getNotifications);
router.get('/notifications/:id', getNotification);
router.post('/notifications/send', send);

module.exports = router;
