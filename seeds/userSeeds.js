const { User } = require('../models');

const userData = [
  {
    username: 'Esra A',
    password: 'password'
  },
  {
    username: 'Abed S',
    password: 'password'
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
