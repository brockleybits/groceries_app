const Express = require('express');
const router = Express.Router();


// Connect to dB queries
const dB = require('../controller/shoppingList');

// Select all Categories and corresponding Items
router.get('/', dB.selectItemCategories);

// Delete Item
router.delete('/', dB.deleteItem);

// Add Item
router.post('/', dB.addItem);

// Get existing Item
router.put('/edit', dB.getItem);

// Edit Item
router.post('/edit', dB.editItem);

// Update Item Selection (Select/Deselect)
router.post('/selection', dB.itemSelection);

// Search Items
router.post('/search', dB.searchItems);



module.exports = router;