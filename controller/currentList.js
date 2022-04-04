// Bring in dB tables
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');


// SELECT all Store and corresponding Item names
exports.currentSelections = (req,res) => {

    sequelize.query(
        "SELECT s.id AS 'store_id', s.store_name AS 'store_name', s.neighborhood AS 'neighborhood', i.id AS 'item_id', i.item_name AS 'item_name' FROM item i JOIN store_item si ON i.id = si.item_id JOIN store s ON s.id = si.store_id WHERE si.user_username = :user AND i.selected = 1 ORDER BY s.id;", {
            replacements: {
                user: req.user
            },
            type: QueryTypes.SELECT
        }
    )
    .then(result => res.json(result))
    .catch(err => console.log('Server-side Current List Results Error: ' + err));
}
