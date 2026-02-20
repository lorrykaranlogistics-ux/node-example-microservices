const buildMessage = ({ orderId, status }) => `Order ${orderId} is now ${status}`;

module.exports = { buildMessage };
