const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { log } = require('../../shared/logger');

const app = express();
app.use(express.json());
app.use(userRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'user-service' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => log('user-service', 'info', `running on ${PORT}`));
