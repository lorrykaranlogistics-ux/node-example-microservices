const express = require('express');
const { send } = require('../controllers/notificationController');

const router = express.Router();
router.post('/notifications/send', send);

module.exports = router;
