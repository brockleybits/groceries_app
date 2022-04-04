// Import dB config & Sequelize components
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');


// SELECT all Category IDs and Names for all Items
exports.selectAll = (req,res) => {

    const selectIds = sequelize.query(
        "SELECT id, item_name FROM item WHERE user_username = :user ORDER BY item_name;", {
            replacements: {
                user: req.user
            },
            type: QueryTypes.SELECT
        }
    )

    const selectCategories = sequelize.query(
        "SELECT id, category_name FROM category ORDER BY id;", {
            type: QueryTypes.SELECT
        }
    )

    const selectStores = sequelize.query(
        "SELECT id, store_name, neighborhood FROM store WHERE user_username = :user ORDER BY id;", {
            replacements: {
                user: req.user
            },
            type: QueryTypes.SELECT
        }
    )

    Promise.all([selectIds, selectCategories, selectStores])
        .then(result => res.json(result))
        .catch(err => console.log('Server-side SELECT Results Error: ' + err));
}


exports.deleteItem = (req,res) => {

    sequelize.query(
        "DELETE FROM store_item WHERE item_id = :id;", {
            replacements: {
                id: req.body.id
            },
            type: QueryTypes.DELETE
        }
    )
    .then(() => {
        sequelize.query(
            "DELETE FROM item WHERE id = :id;", {
                replacements: {
                    id: req.body.id
                },
                type: QueryTypes.DELETE
            }
        )
    })
    .then(result => res.json(result))
    .catch(err => console.log(`Server-side DELETE Error: ${err}`));

}


exports.insertItem = (req,res) => {

    sequelize.query(
        "INSERT INTO item VALUES (:user, null, :name, :category_id, 0);", {
            replacements: {
                user: req.user,
                name: req.body.name,
                category_id: req.body.category_id,
            },
            type: QueryTypes.POST
        }
    )
    .then((result) => {
        let user = req.user;
        let item_id = result[0];
        for (let store_id of req.body.store_id) {
            sequelize.query(
                "INSERT INTO store_item VALUES (:user, :store_id, :item_id);", {
                    replacements: {
                        user,
                        item_id,
                        store_id
                    },
                    type: QueryTypes.POST
                }
            )
            .then(() => console.log(`Item ID ${item_id} added to Store ID ${store_id}`))
            .catch(err => console.log('Server-side Store_Item Table INSERT Results Error: ' + err));
        }
        res.json(result);
    })
    .catch(err => console.log('Server-side Item Table INSERT Results Error: ' + err));
}

// SELECT Item info
exports.getItem = (req,res) => {

    const selectInfo = sequelize.query(
        "SELECT id, item_name, category_id FROM item WHERE id = :id;", {
            replacements: {
                id: req.body.data
            },
            type: QueryTypes.SELECT
        }
    )

    const selectStoreIds = sequelize.query(
        "SELECT store_id FROM store_item WHERE item_id = :id;", {
            replacements: {
                id: req.body.data
            },
            type: QueryTypes.SELECT
        }
    )

    Promise.all([selectInfo, selectStoreIds])
        .then(result => res.json(result))
        .catch(err => console.log('Server-side SELECT Item Info Results Error: ' + err));
}


// Upate Item
exports.updateItem = (req,res) => {

    sequelize.query(
        "UPDATE item SET item_name = :name, category_id = :category_id WHERE id = :id;", {
            replacements: {
                id: req.body.id,
                name: req.body.name,
                category_id: req.body.category_id,
            },
            type: QueryTypes.POST
        }
    )
    .then((result) => {

        let user = req.user;
        let item_id = req.body.id;

        if (!!req.body.addStore.length) {
            for (let store_id of req.body.addStore) {
                sequelize.query(
                    "INSERT INTO store_item VALUES (:user, :store_id, :item_id);", {
                        replacements: {
                            user,
                            item_id,
                            store_id
                        },
                        type: QueryTypes.POST
                    }
                )
                .then(() => console.log(`Item ID ${item_id} added to Store ID ${store_id}`))
                .catch(err => console.log('Server-side Store_Item Table INSERT Error: ' + err));
            }
        }

        if (!!req.body.removeStore.length) {
            for (let store_id of req.body.removeStore) {
                sequelize.query(
                    "DELETE FROM store_item WHERE item_id = :item_id AND store_id = :store_id;", {
                        replacements: {
                            item_id,
                            store_id
                        },
                        type: QueryTypes.DELETE
                    }
                )
                .then(() => console.log(`Item ID ${item_id} and Store ID ${store_id} deleted.`))
                .catch(err => console.log('Server-side Store_Item Table DELETE Error: ' + err));
            }
        }

        res.json(result);
    })
    .catch(err => console.log('Server-side Item Table INSERT Results Error: ' + err));
}


// Deselect Items
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