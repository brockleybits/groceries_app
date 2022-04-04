const Express = require('express');
const router = Express.Router();
const { verifyAuthenticated } = require('../config/authenticate');

// Connect to dB queries
const dB = require('../controller/login');

// Verify login
router.post('/', dB.verifyLogin);

// Get hashed password
router.post('/hash-word', verifyAuthenticated, dB.hashWord);

// Logout
router.delete('/', verifyAuthenticated, dB.logout);


module.exports = router;