const records = [];

const saveNotification = (payload) => {
  const row = { id: `n_${records.length + 1}`, ...payload, createdAt: new Date().toISOString() };
  records.push(row);
  return row;
};

const listNotifications = () => records;
const findNotification = (id) => records.find((n) => n.id === id);

module.exports = { saveNotification, listNotifications, findNotification };
