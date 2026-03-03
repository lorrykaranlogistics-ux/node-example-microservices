const express = require('express');
const { create, getOrders, getOrder, patchOrderStatus } = require('../controllers/orderController');

const router = express.Router();
router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders', create);
router.post('/orders/:id/update', create);
router.patch('/orders/:id/status', patchOrderStatus);

module.exports = router;
