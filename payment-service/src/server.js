const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');
const { log } = require('../../shared/logger');

const app = express();
app.use(express.json());
app.use(paymentRoutes);
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'payment-service' }));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => log('payment-service', 'info', `running on ${PORT}`));
