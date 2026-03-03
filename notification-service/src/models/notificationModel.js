const records = [];

const saveNotification = (payload) => {
  const row = { id: `n_${records.length + 1}`, ...payload, createdAt: new Date().toISOString() };
  records.push(row);
  return row;
};

const listNotifications = () => records;
const listNotificationsByUser = (userId) => records.filter((n) => n.userId === userId);
const listNotificationsByOrder = (orderId) => records.filter((n) => n.orderId === orderId);
const findNotification = (id) => records.find((n) => n.id === id);

module.exports = { saveNotification, listNotifications, listNotificationsByUser, listNotificationsByOrder, findNotification };
