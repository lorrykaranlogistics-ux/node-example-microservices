const { ok, fail } = require('../../../shared/response');
const { saveNotification, listNotifications, findNotification } = require('../models/notificationModel');
const { buildMessage } = require('../utils/messageBuilder');

const send = (req, res) => {
  const payload = {
    ...req.body,
    message: buildMessage(req.body),
  };
  const row = saveNotification(payload);
  res.status(201).json(ok(row));
};

const getNotifications = (_req, res) => res.json(ok(listNotifications()));

const getNotification = (req, res) => {
  const row = findNotification(req.params.id);
  if (!row) return res.status(404).json(fail('notification not found'));
  return res.json(ok(row));
};

module.exports = { send, getNotifications, getNotification };
