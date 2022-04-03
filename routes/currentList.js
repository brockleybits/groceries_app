const Express = require('express');
const router = Express.Router();
const { verifyAuthenticated } = require('../config/authenticate');

// Connect to dB queries
const dB = require('../controller/currentList');

// Select all stores
router.get('/',verifyAuthenticated, dB.currentSelections);

// Add new store
// router.post('/', dB.addStore);

// Delete Items
// router.delete('/', dB.deleteStore);

module.exports = router;