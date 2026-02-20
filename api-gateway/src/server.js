const express = require('express');
const gatewayRoutes = require('./routes/gatewayRoutes');
const { log } = require('../../shared/logger');

const app = express();
app.use(express.json());
app.use(gatewayRoutes);
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'api-gateway' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log('api-gateway', 'info', `running on ${PORT}`));
