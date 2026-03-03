const orders = [];

const createOrder = (orderInput) => {
  const order = {
    id: `o_${orders.length + 1}`,
    userId: orderInput.userId,
    amount: orderInput.amount,
    currency: orderInput.currency,
    paymentId: orderInput.paymentId,
    transactionRef: orderInput.transactionRef || null,
    status: 'canceled',
  };
  orders.push(order);
  return order;
};

const listOrders = () => orders;
const listOrdersByUser = (userId) => orders.filter((o) => o.userId === userId);
const findOrder = (id) => orders.find((o) => o.id === id);
const updateOrderStatus = (id, status) => {
  const order = findOrder(id);
  if (!order) return null;
  order.status = status;
  return order;
};

module.exports = { createOrder, listOrders, listOrdersByUser, findOrder, updateOrderStatus };
