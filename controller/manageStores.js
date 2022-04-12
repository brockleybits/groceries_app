// Import dB config & Sequelize components
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');


// SELECT all Category IDs and Names for all Items
exports.selectStores = (req,res) => {

    sequelize.query(
        "SELECT * FROM store WHERE user_username = :user;", {
            replacements: {
                user: req.user
            },
            type: QueryTypes.SELECT
        }
    )
    .then(result => res.json(result))
    .catch(err => console.log('*** ERROR  *** Server-side SELECT Stores Results Error: ' + err));
}

exports.insertStore = (req,res) => {

    sequelize.query(
        "INSERT INTO store(user_username,store_name,neighborhood) VALUES (:user, :store_name, :neighborhood);", {
            replacements: {
                user: req.user,
                store_name: req.body.store_name,
                neighborhood: req.body.neighborhood,
            },
            type: QueryTypes.POST
        }
    )
    .then((result) => res.json(result))
    .catch(err => console.log('*** ERROR  *** Server-side Store Table INSERT Results Error: ' + err));
}

exports.deleteStore = (req,res) => {

    let store_id = req.body.id;

    sequelize.query(
        "SELECT item_id FROM store_item WHERE store_id = :store_id;", {
            replacements: {
                store_id
            },
            type: QueryTypes.SELECT
        }
    )
    .then((itemIdArray) => {

        let itemList = [];

        if (!!itemIdArray.length) {

            for (item of itemIdArray) itemList.push(item.item_id);
    
            const storeItems = sequelize.query(
                "SELECT item_id, COUNT(item_id) AS unique FROM store_item WHERE item_id IN (:itemList) GROUP BY item_id;", {
                    replacements: {
                        itemList
                    },
                    type: QueryTypes.SELECT
                }
            )
    
            return storeItems;
        }

        return [];

    })
    .then(scannedItems => {

        let uniqueItemIds = [];
        
        for (item of scannedItems) {
            if (item.unique === '1') uniqueItemIds.push(item.item_id);
        }

        sequelize.query(
            "DELETE FROM store_item WHERE store_id = :store_id;", {
                replacements: {
                    store_id
                },
                type: QueryTypes.DELETE
            }
        )
        
        return uniqueItemIds;

    })
    .then((uniques) => {

        console.log('Ready to delete Item IDs:');
        console.log(uniques);

        if (!!uniques.length) {
            sequelize.query(
                "DELETE FROM item WHERE id IN (:uniques);", {
                    replacements: {
                        uniques
                    },
                    type: QueryTypes.DELETE
                }
            )
        }

    })
    .then(() => {

        sequelize.query(
            "DELETE FROM store WHERE id = :store_id;", {
                replacements: {
                    store_id
                },
                type: QueryTypes.DELETE
            }
        )

    })
    .then((result) => res.json(result))
    .catch(err => console.log(`*** ERROR  *** Server-side DELETE Error: ${err}`));

}