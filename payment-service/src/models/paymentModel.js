const payments = [];

const createPayment = (payment) => {
  const row = { ...payment, id: `p_${payments.length + 1}`, status: 'APPROVED' };
  payments.push(row);
  return row;
};

const listPayments = () => payments;
const listPaymentsByStatus = (status) =>
  payments.filter((p) => String(p.status || '').toUpperCase() === String(status).toUpperCase());
const findPayment = (id) => payments.find((p) => p.id === id);
const updatePaymentStatus = (id, status) => {
  const payment = findPayment(id);
  if (!payment) return null;
  payment.status = status;
  return payment;
};

module.exports = { createPayment, listPayments, listPaymentsByStatus, findPayment, updatePaymentStatus };
