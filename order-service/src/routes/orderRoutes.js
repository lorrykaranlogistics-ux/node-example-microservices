const express = require('express');
const { create, getOrders, getOrdersByUser, getOrder, patchOrderStatus, cancelOrder } = require('../controllers/orderController');

const router = express.Router();
router.get('/orders', getOrders);
router.get('/orders/user/:userId', getOrdersByUser);
router.get('/orders/:id', getOrder);
router.post('/orders', create);
router.patch('/orders/:id/status', patchOrderStatus);
router.post('/orders/:id/cancel', cancelOrder);

module.exports = router;
