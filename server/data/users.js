const { randomUUID } = require('crypto');

const users = [];

const findByEmail = (email) => users.find((user) => user.email.toLowerCase() === email.toLowerCase());

const createUser = ({ name, email, password }) => {
  const user = {
    id: randomUUID(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
};

module.exports = {
  findByEmail,
  createUser,
};
