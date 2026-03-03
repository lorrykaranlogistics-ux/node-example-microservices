const { listUsers, findUser, createUser } = require('../models/userModel');
const { ok, fail } = require('../../../shared/response');

const getUsers = (_req, res) => res.json(ok(listUsers()));

const getUser = (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json(fail('user not found'));
  }
  return res.json(ok(user));
};

const postUser = (req, res) => {
  const { name, tier } = req.body || {};
  if (!name) {
    return res.status(400).json(fail('name is required'));
  }
  return res.status(201).json(ok(createUser({ name, tier })));
};

module.exports = { getUsers, getUser, postUser };
