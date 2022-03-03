const Express = require('express');
const router = Express.Router();

// Connect to dB queries
const dB = require('../controller/currentList');

// Select all stores
router.get('/', dB.currentSelections);

// Add new store
// router.post('/', dB.addStore);

// Delete Items
// router.delete('/', dB.deleteStore);

module.exports = router;