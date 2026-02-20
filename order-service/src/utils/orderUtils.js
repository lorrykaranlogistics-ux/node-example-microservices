const buildNotificationPayload = (order) => ({
  orderId: order.id,
  userId: order.userId,
  status: order.status,
  amount: order.amount,
});

module.exports = { buildNotificationPayload };
