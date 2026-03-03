const orders = [];

const createOrder = (orderInput) => {
  const order = {
    id: `o_${orders.length + 1}`,
    userId: orderInput.userId,
    amount: orderInput.amount,
    currency: orderInput.currency,
    paymentId: orderInput.paymentId,
    transactionRef: orderInput.transactionRef || null,
    items: Array.isArray(orderInput.items) ? orderInput.items : [],
    shippingAddress: orderInput.shippingAddress || null,
    billingAddress: orderInput.billingAddress || null,
    customerNote: orderInput.customerNote || null,
    couponCode: orderInput.couponCode || null,
    priority: orderInput.priority || 'normal',
    status: 'canceled',
  };
  orders.push(order);
  return order;
};

const listOrders = () => orders;
const findOrder = (id) => orders.find((o) => o.id === id);
const updateOrderStatus = (id, status) => {
  const order = findOrder(id);
  if (!order) return null;
  order.status = status;
  return order;
};

module.exports = { createOrder, listOrders, findOrder, updateOrderStatus };
