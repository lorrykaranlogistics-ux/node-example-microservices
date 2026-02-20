const { findUser } = require('../models/userModel');
const { ok, fail } = require('../../../shared/response');

const getUser = (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json(fail('user not found'));
  }
  return res.json(ok(user));
};

module.exports = { getUser };
