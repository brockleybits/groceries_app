const Express = require('express');
const router = Express.Router();
const { verifyAuthenticated } = require('../config/authenticate');


// Connect to dB queries
const dB = require('../controller/updateList');

// Select all Categories and corresponding Items
router.get('/',verifyAuthenticated, dB.selectItemCategories);

// Update Item selections
router.post('/', dB.updateItemSelections);

module.exports = router;