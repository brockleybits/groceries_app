// Login to database
const Sequelize = require('sequelize');


if (process.env.NODE_ENV === 'production') {

    // HEROKU
    module.exports = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

} else {

    // LOCAL POSTGRES
    module.exports = new Sequelize('groceries', process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres'
    });
    
}


// LOCAL MYSQL
// module.exports = new Sequelize('groceries', process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql'
//   });

