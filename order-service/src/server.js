const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const { log } = require('../../shared/logger');

const app = express();
app.use(express.json());
app.use(orderRoutes);
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'order-service' }));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => log('order-service', 'info', `running on ${PORT}`));
