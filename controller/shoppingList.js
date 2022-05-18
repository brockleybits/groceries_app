// Import dB config & Sequelize components
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');

// Import Category Order
const categoryOrder = require('../config/category_order');

// Import Compute functions
const compareArrays = require('../compute/compare_arrays');
const addCategoryEmoji = require('../compute/add_category_emoji');


async function getCategoryItems(user, search='') {
    try {

        let pattern = '(' + search + ')+';

        const data = await sequelize.query(
            "SELECT c.id AS category_id, c.category_name AS category_name, i.id AS item_id, i.item_name AS item_name, i.selected AS selected FROM item i JOIN category c ON i.category_id = c.id WHERE i.user_username = :user AND item_name ~* :pattern ORDER BY c.id;", {
                replacements: {
                    user,
                    pattern
                },
                type: QueryTypes.SELECT
            }
        );
        addCategoryEmoji(data,"category_id");
        return data;

    } catch (err) {
        console.log(err)
    }
}

function buildCategoryArray(table) {

    let categoryObject = {};
    for (let row of table) {
        if (categoryObject[row.category_id]) {
            categoryObject[row.category_id].items.push({
                item_id: row.item_id,
                item_name: row.item_name,
                selected: row.selected > 0 ? true : false
            });
        } else {
            categoryObject[row.category_id] = {
                category_id: row.category_id,
                category_name: row.category_name,
                items: [{
                    item_id: row.item_id,
                    item_name: row.item_name,
                    selected: row.selected > 0 ? true : false
                }]
            }
        }
    }

    for (let key of Object.keys(categoryObject)) {
        categoryObject[key].items.sort((a,b) => a.item_name.localeCompare(b.item_name));
    }

    let categoryArray = [];
    for (let id of Object.keys(categoryObject)) {
        categoryArray.push(categoryObject[id]);
    }

    compareArrays(categoryArray, categoryOrder, "category_id");

    return categoryArray;
}


// Select all Categories and Items
exports.selectItemCategories = async(req,res) => {

    try {

        const categories = await sequelize.query(
            "SELECT * FROM category ORDER BY category_name;", {
                type: QueryTypes.SELECT
            }
        )

        const stores = await sequelize.query(
            "SELECT id, store_name, neighborhood FROM store WHERE user_username = :user ORDER BY id;", {
                replacements: {
                    user: req.user
                },
                type: QueryTypes.SELECT
            }
        )

        const categoryItemsTable = await getCategoryItems(req.user);
        addCategoryEmoji(categories, "id");
        const categoryArray = buildCategoryArray(categoryItemsTable);
        res.json([categoryArray, categories, stores]);
        return;

    } catch (err) {
        console.log('*** ERROR *** Server-side GET Shopping List Error: ' + err);
    }

}


// Select or Deselect single Item
exports.itemSelection = async(req,res) => {

    try {
        await sequelize.query(
            "UPDATE item SET selected = :value WHERE id = :id;", {
                replacements: {
                    id: req.body.item_id,
                    value: req.body.value
                },
                type: QueryTypes.POST
            }
        );
        res.json({message: 'Item selection complete.'});
        return;

    } catch (err) {
        console.log('*** ERROR *** Server-side UPDATE Item Selection Error: ' + err);
    }
}


// Search for Item(s)
exports.searchItems = async(req,res) => {

    try {

        const searchItems = await getCategoryItems(req.user, req.body.pattern)
        const categoryArray = buildCategoryArray(searchItems);
        res.json(categoryArray);
        return;

    } catch (err) {
        console.log('*** ERROR *** Server-side SEARCH ITEMS Error: ' + err);
    }
}


// Delete Item
exports.deleteItem = async(req,res) => {

    try {
        await sequelize.query(
                "DELETE FROM store_item WHERE item_id = :id;", {
                    replacements: {
                        id: req.body.id
                    },
                    type: QueryTypes.DELETE
                }
            );

        await sequelize.query(
                "DELETE FROM item WHERE id = :id;", {
                    replacements: {
                        id: req.body.id
                    },
                    type: QueryTypes.DELETE
                }
            );

        res.json({message: 'Item deleted successfully.'});
        return;

    } catch (err) {
        console.log(`*** ERROR *** Server-side DELETE Item Error: ${err}`);
    }
}


// Add Item into dB
exports.addItem = async(req,res) => {
    try {
        let user = req.user;

        const newItemId = await sequelize.query(
            "INSERT INTO item(user_username,item_name,category_id,selected) VALUES (:user, :name, :category_id, 0) RETURNING id;", {
                replacements: {
                    user,
                    name: req.body.name,
                    category_id: req.body.category_id,
                },
                type: QueryTypes.POST,
                raw: true
            }
        );

        for (let store_id of req.body.store_id) {
            await sequelize.query(
                "INSERT INTO store_item VALUES (:user, :store_id, :item_id);", {
                    replacements: {
                        user,
                        item_id: newItemId[0][0].id,
                        store_id
                    },
                    type: QueryTypes.POST
                }
            );
        }

        const getItems = await getCategoryItems(user);
        const categoryArray = buildCategoryArray(getItems);
        res.json(categoryArray);
        return;

    } catch(err) {
        console.log(`*** ERROR *** Server-side INSERT Item Error: ${err}`);
    }
}


// Get existing Item
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
        .catch(err => console.log('*** ERROR  *** Server-side SELECT Item Info Results Error: ' + err));
}


// Edit Item
exports.editItem = async(req,res) => {

    try {

        let user = req.user;
        let item_id = req.body.id;

        await sequelize.query(
            "UPDATE item SET item_name = :name, category_id = :category_id WHERE id = :id;", {
                replacements: {
                    id: item_id,
                    name: req.body.name,
                    category_id: req.body.category_id,
                },
                type: QueryTypes.POST
            }
        );

        if (!!req.body.addStore.length) {
            for (let store_id of req.body.addStore) {
                await sequelize.query(
                    "INSERT INTO store_item VALUES (:user, :store_id, :item_id);", {
                        replacements: {
                            user,
                            item_id,
                            store_id
                        },
                        type: QueryTypes.POST
                    }
                );
            }
        }

        if (!!req.body.removeStore.length) {
            for (let store_id of req.body.removeStore) {
                await sequelize.query(
                    "DELETE FROM store_item WHERE item_id = :item_id AND store_id = :store_id;", {
                        replacements: {
                            item_id,
                            store_id
                        },
                        type: QueryTypes.DELETE
                    }
                );
            }
        }

        res.json({message: 'Item edited successfully.'});
        return;

    } catch(err) {
        console.log('*** ERROR *** Server-side EDIT Item Results Error: ' + err)
    }
}