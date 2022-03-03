const Express = require('express');
const router = Express.Router();

// Connect to dB queries
const dB = require('../controller/manageItems');

// Select all Items, Categories and Stores
router.put('/', dB.getItem);

// Insert new Item
router.post('/', dB.updateItem);


module.exports = router;