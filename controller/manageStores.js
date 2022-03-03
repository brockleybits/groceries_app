// Import dB config & Sequelize components
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');


// SELECT all Category IDs and Names for all Items
exports.selectStores = (req,res) => {

    sequelize.query(
        "SELECT * FROM store", {
            type: QueryTypes.SELECT
        }
    )
    .then(result => res.json(result))
    .catch(err => console.log('Server-side SELECT Stores Results Error: ' + err));
}

exports.insertStore = (req,res) => {

    sequelize.query(
        "INSERT INTO store VALUES (null, :store_name, :neighborhood);", {
            replacements: {
                store_name: req.body.store_name,
                neighborhood: req.body.neighborhood,
            },
            type: QueryTypes.POST
        }
    )
    .then((result) => res.json(result))
    .catch(err => console.log('Server-side Store Table INSERT Results Error: ' + err));
}