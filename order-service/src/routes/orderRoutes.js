const express = require('express');
const { create } = require('../controllers/orderController');

const router = express.Router();
router.post('/orders', create);

module.exports = router;
