const express = require('express');
const { authorizePayment, getPayments, getPayment } = require('../controllers/paymentController');

const router = express.Router();
router.get('/payments', getPayments);
router.get('/payments/:id', getPayment);
router.post('/payments/authorize', authorizePayment);

module.exports = router;
