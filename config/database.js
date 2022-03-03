// Login to database
const Sequelize = require('sequelize');

module.exports = new Sequelize('groceries', 'user', 'pass', {
    host: 'localhost',
    dialect: 'mysql'
  });