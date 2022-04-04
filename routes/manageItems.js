const Express = require('express');
const router = Express.Router();
const { verifyAuthenticated } = require('../config/authenticate');


// Connect to dB queries
const dB = require('../controller/manageItems');

// Select all Items, Categories and Stores
router.get('/', verifyAuthenticated, dB.selectAll);

// Delete Item
router.delete('/', verifyAuthenticated, dB.deleteItem);

// Insert new Item
router.post('/', verifyAuthenticated, dB.insertItem);

// Select specific Item and its associated Category & Store(s)
router.put('/edit', verifyAuthenticated, dB.getItem);

// Insert new Item
router.post('/edit', verifyAuthenticated, dB.updateItem);

// Delesect Items
router.post('/deselect', verifyAuthenticated, dB.deselectItems);


module.exports = router;