const users = [
  { id: 'u1', name: 'Alice', tier: 'gold' },
  { id: 'u2', name: 'Bob', tier: 'silver' },
];

const listUsers = () => users;
const findUser = (id) => users.find((u) => u.id === id);
const createUser = ({ name, tier = 'silver' }) => {
  const row = { id: `u${users.length + 1}`, name, tier };
  users.push(row);
  return row;
};

module.exports = { listUsers, findUser, createUser };
