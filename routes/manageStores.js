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

// Update Store
router.post('/edit', dB.editStore);

// Get single Store
router.post('/get-store', dB.getStore);


module.exports = router;