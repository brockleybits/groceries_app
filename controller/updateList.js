// Import dB config & Sequelize components
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');


// SELECT all Categories and Items info
exports.selectItemCategories = (req,res) => {
    sequelize.query(
        "SELECT c.id AS 'category_id', c.category_name AS 'category_name', i.id AS 'item_id', i.item_name AS 'item_name', i.selected AS 'selected' FROM item i JOIN category c ON i.category_id = c.id ORDER BY c.id;", {
            type: QueryTypes.SELECT
        }
    )
    .then(result => res.json(result))
    .catch(err => console.log('Server-side Results Error: ' + err));
}

// UPDATE Items to reflect selections
exports.updateItemSelections = (req,res) => {

    let unselected, selected;

    if (!req.body.selected.length) selected = null;
    else if (req.body.selected.length === 1) selected = req.body.selected[0];
    else selected = req.body.selected;

    if (!req.body.unselected.length) unselected = null;
    else if (req.body.unselected.length === 1) unselected = req.body.unselected[0];
    else unselected = req.body.unselected;


    const unselectItems = sequelize.query(
        "UPDATE item SET selected = 0 WHERE id IN (:id);", {
            replacements: {
                id: unselected
            },
            type: QueryTypes.POST
        }
    )

    const selectItems = sequelize.query(
        "UPDATE item SET selected = 1 WHERE id IN (:id);", {
            replacements: {
                id: selected
            },
            type: QueryTypes.POST
        }
    )

    Promise.all([unselectItems, selectItems])
    .then(result => res.json(result))
    .catch(err => console.log('Server-side Results Error: ' + err));
}

