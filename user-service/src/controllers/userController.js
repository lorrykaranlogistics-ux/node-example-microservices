const { listUsers, findUser, listUsersByTier, createUser, updateUser, deleteUser } = require('../models/userModel');
const { ok, fail } = require('../../../shared/response');

const getUsers = (_req, res) => res.json(ok(listUsers()));
const getUsersByTier = (req, res) => res.json(ok(listUsersByTier(req.params.tier)));

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

const putUser = (req, res) => {
  const { name, tier } = req.body || {};
  if (name === undefined && tier === undefined) {
    return res.status(400).json(fail('name or tier is required'));
  }
  const user = updateUser(req.params.id, { name, tier });
  if (!user) return res.status(404).json(fail('user not found'));
  return res.json(ok(user));
};

const removeUser = (req, res) => {
  const deleted = deleteUser(req.params.id);
  if (!deleted) return res.status(404).json(fail('user not found'));
  return res.json(ok({ id: req.params.id, deleted: true }));
};

module.exports = { getUsers, getUsersByTier, getUser, postUser, putUser, removeUser };
