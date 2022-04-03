const passport = require('passport');

module.exports = {
    verifyAuthenticated: (req,res,next,) => {

            console.log('Verifying User:');

            if (req.isAuthenticated()) {
                console.log('User Verified');
            }
            else {
                console.log('*** User Not Authenticated ***');
                res.status(401);
            }

            return next();

    }
}