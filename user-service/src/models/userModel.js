const users = [
  { id: 'u1', name: 'Alice', tier: 'gold' },
  { id: 'u2', name: 'Bob', tier: 'silver' },
];

const listUsers = () => users;
const findUser = (id) => users.find((u) => u.id === id);
const listUsersByTier = (tier) => users.filter((u) => String(u.tier || '').toLowerCase() === String(tier).toLowerCase());
const createUser = ({ name, tier = 'silver' }) => {
  const row = { id: `u${users.length + 1}`, name, tier };
  users.push(row);
  return row;
};
const updateUser = (id, patch) => {
  const user = findUser(id);
  if (!user) return null;
  if (patch.name !== undefined) user.name = patch.name;
  if (patch.tier !== undefined) user.tier = patch.tier;
  return user;
};
const deleteUser = (id) => {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
};

module.exports = { listUsers, findUser, listUsersByTier, createUser, updateUser, deleteUser };
