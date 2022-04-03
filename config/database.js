// Login to database
const Sequelize = require('sequelize');

module.exports = new Sequelize('groceries', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });