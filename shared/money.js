const normalizeAmount = (amount) => Math.round(Number(amount) * 100) / 100;

module.exports = { normalizeAmount };
