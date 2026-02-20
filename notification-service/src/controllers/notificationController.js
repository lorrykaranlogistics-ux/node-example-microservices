const { ok } = require('../../../shared/response');
const { saveNotification } = require('../models/notificationModel');
const { buildMessage } = require('../utils/messageBuilder');

const send = (req, res) => {
  const payload = {
    ...req.body,
    message: buildMessage(req.body),
  };
  const row = saveNotification(payload);
  res.status(201).json(ok(row));
};

module.exports = { send };
