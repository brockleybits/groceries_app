// Login to database
const Sequelize = require('sequelize');

// HEROKU
module.exports = new Sequelize(process.env.DATABASE_URL, {
    native: true
});

// LOCAL MYSQL
// module.exports = new Sequelize('groceries', process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql'
//   });

// LOCAL POSTGRES
// module.exports = new Sequelize('groceries', process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: 'localhost',
//     dialect: 'postgres'
//   });