const payments = [];

const createPayment = (payment) => {
  const row = { ...payment, id: `p_${payments.length + 1}`, status: 'APPROVED' };
  payments.push(row);
  return row;
};

const listPayments = () => payments;
const findPayment = (id) => payments.find((p) => p.id === id);

module.exports = { createPayment, listPayments, findPayment };
