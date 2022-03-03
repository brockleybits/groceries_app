// Import Sequelize
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');

exports.deselectItems = (req,res) => {

    let deselect = req.body.deselect;

    if (!req.body.deselect.length) deselect = null;
    else if (req.body.deselect.length === 1) deselect = req.body.deselect[0];
    else deselect = req.body.deselect;

    sequelize.query(
        "UPDATE item SET selected = 0 WHERE id IN (:id)", {
            replacements: {
                id: deselect
            },
            type: QueryTypes.POST
        }
    )
    .then((result) => res.json(result))
    .catch(err => console.log('Server-side Results Error: ' + err));
}