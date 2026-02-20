const axios = require('axios');
const { log } = require('./logger');

const request = async (service, method, url, data = {}) => {
  try {
    const res = await axios({ method, url, data, timeout: 2000 });
    return res.data;
  } catch (err) {
    log(service, 'error', 'http request failed', { url, error: err.message });
    throw err;
  }
};

module.exports = { request };
