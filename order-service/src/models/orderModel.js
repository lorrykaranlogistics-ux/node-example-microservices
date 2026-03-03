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

module.exports = { createOrder };
