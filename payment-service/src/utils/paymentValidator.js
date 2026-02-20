const { normalizeAmount } = require('../../../shared/money');

const validatePayment = ({ cardNumber, amount, currency }) => {
  if (!cardNumber || String(cardNumber).length < 12) {
    throw new Error('Invalid card number');
  }

  const parsedAmount = normalizeAmount(amount);
  if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Invalid amount');
  }

  if (!['USD', 'EUR', 'INR'].includes(currency)) {
    throw new Error('Unsupported currency');
  }

  return { parsedAmount };
};

module.exports = { validatePayment };
