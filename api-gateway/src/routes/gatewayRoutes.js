const express = require('express');
const { createOrder } = require('../controllers/gatewayController');

const router = express.Router();
router.post('/api/orders', createOrder);

module.exports = router;
