const Express = require('express');
const router = Express.Router();

// Connect to dB queries
const dB = require('../controller/manageStores');

// Select all products
router.get('/', dB.selectStores);

// Insert Store
router.post('/', dB.insertStore);

// Delete Store
router.delete('/', dB.deleteStore);

module.exports = router;