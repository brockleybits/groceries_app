const Express = require('express');
const router = Express.Router();
const { verifyAuthenticated } = require('../config/authenticate');


// Connect to dB queries
const dB = require('../controller/manageItems');

// Select all Items, Categories and Stores
router.get('/',verifyAuthenticated, dB.selectAll);

// Delete Item
router.delete('/', dB.deleteItem);

// Insert new Item
router.post('/', dB.insertItem);


module.exports = router;