const users = [
  { id: 'u1', name: 'Alice', tier: 'gold' },
  { id: 'u2', name: 'Bob', tier: 'silver' },
];

const findUser = (id) => users.find((u) => u.id === id);

module.exports = { findUser };
