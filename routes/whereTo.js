const Express = require('express');
const router = Express.Router();

// Connect to dB queries
const dB = require('../controller/whereTo');

// Select all stores
router.get('/', dB.currentSelections);

// Update Item Selection (Select/Deselect)
router.post('/selection', dB.itemSelection);


module.exports = router;