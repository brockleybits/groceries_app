const LocalStrategy = require('passport-local').Strategy;

// MySQL dB
const sequelize = require('./database');
const { QueryTypes} = require('sequelize');

// bcrypt
const bcrypt = require('bcryptjs');

module.exports = function(passport) {

    passport.use(new LocalStrategy((username, password, done) => {

        sequelize.query(
            "SELECT * FROM user WHERE username = :username", {
                replacements:{
                    username
                },
                type: QueryTypes.SELECT
            }
        )
        .then(data => {

            if (data.length === 0) return done(null, false);

            bcrypt.compare(password, data[0].password)
            .then(valid => {
                if (valid) {
                    let user = data[0];
                    return done(null, user);
                }
                else {
                    return done(console.log(null, false));
                }

            })
            .catch(err => console.log(err));

        })
        .catch(err => console.log(err));
    }));

    passport.serializeUser((user, cb) => {
        console.log('Serializing User...');
        console.log(user);
        return cb(null, user.username);
      });
      
    passport.deserializeUser((user, cb) => {

        console.log('Deserializing User...');
        console.log(user);
        return cb(null, user);

      });

}