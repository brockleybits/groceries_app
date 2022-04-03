// Passport (Local Strategy)
const passport = require('passport');

// MySQL dB
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');

// bcrypt
const bcrypt = require('bcryptjs');


// Login user
exports.verifyLogin = (req,res,next) => {

    passport.authenticate('local', (err,user) => {
        console.log('Athenticating User...');
        console.log(user);

        if (err) throw err;
        if (!user) {
            res.json({
                auth: false,
                location: '/'
            });
        } else {
            req.login(user, (err) => {
                if (err) throw err;
                res.json({
                    auth: true,
                    location: '/dashboard'
                });
            })
        }
        return next();
    })(req,res,next);

}

// Logout user
exports.logout = (req,res) => {

    req.logout();
    res.json({
        auth: false,
        location: '/'
    });

}

// Register new user
exports.bcryptTest = async (req,res) => {
    const password = req.body.password;
    const salty = await bcrypt.genSalt(10);
    const hashy = await bcrypt.hash(password, salty);
    res.send({
        password,
        hashy
    });
}