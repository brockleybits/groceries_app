const Express = require('express');
const router = Express.Router();

// Connect to dB queries
const dB = require('../controller/updateList');

// Select all Categories and corresponding Items
router.get('/', dB.selectItemCategories);

// Update Item selections
router.post('/', dB.updateItemSelections);

module.exports = router;