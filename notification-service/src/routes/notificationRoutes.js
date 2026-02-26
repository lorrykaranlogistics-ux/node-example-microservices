const express = require('express');
const { send } = require('../controllers/notificationController');

const router = express.Router();
router.post('/notifications/send_dummy', send);

module.exports = router;
