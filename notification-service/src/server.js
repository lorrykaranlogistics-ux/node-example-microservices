const express = require('express');
const notificationRoutes = require('./routes/notificationRoutes');
const { log } = require('../../shared/logger');

const app = express();
app.use(express.json());
app.use(notificationRoutes);
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'notification-service' }));

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => log('notification-service', 'info', `running on ${PORT}`));
