const express = require('express');
const { authorizePayment, getPayments, getPaymentsByStatus, getPayment, refundPayment } = require('../controllers/paymentController');

const router = express.Router();
router.get('/payments', getPayments);
router.get('/payments/status/:status', getPaymentsByStatus);
router.get('/payments/:id', getPayment);
router.post('/payments/authorize', authorizePayment);
router.post('/payments/:id/refund', refundPayment);

module.exports = router;
