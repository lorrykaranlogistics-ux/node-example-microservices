const express = require('express');
const { authorizePayment } = require('../controllers/paymentController');

const router = express.Router();
router.post('/payments/authorize', authorizePayment);

module.exports = router;
