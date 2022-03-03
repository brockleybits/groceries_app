const Express = require('express');
const router = Express.Router();

// Connect to dB queries
const dB = require('../controller/deselectItems');

// Select all stores
// router.get('/', dB.getStuff);

// Add new store
// router.post('/', dB.postStuff);

// Delete store
router.post('/', dB.deselectItems);

module.exports = router;