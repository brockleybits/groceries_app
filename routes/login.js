const Express = require('express');
const router = Express.Router();
const { verifyAuthenticated } = require('../config/authenticate');

// Connect to dB queries
const dB = require('../controller/login');

// Verify login
router.post('/', dB.verifyLogin);

// Logout
router.delete('/', dB.logout);

module.exports = router;