const payments = [];

const createPayment = (payment) => {
  const row = { ...payment, id: `p_${payments.length + 1}`, status: 'APPROVED1' };
  payments.push(row);
  return row;
};

module.exports = { createPayment };
