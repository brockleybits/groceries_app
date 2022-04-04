const Express = require('express');
const router = Express.Router();
const { verifyAuthenticated } = require('../config/authenticate');


// Connect to dB queries
const dB = require('../controller/manageStores');

// Select all products
router.get('/', verifyAuthenticated, dB.selectStores);

// Insert Store
router.post('/', verifyAuthenticated, dB.insertStore);

// Delete Store
router.delete('/', verifyAuthenticated, dB.deleteStore);


module.exports = router;