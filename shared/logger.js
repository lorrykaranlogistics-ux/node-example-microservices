const log = (service, level, message, meta = {}) => {
  const payload = {
    timestamp: new Date().toISOString(),
    service,
    level,
    message,
    meta,
  };
  console.log(JSON.stringify(payload));
};

module.exports = { log };
