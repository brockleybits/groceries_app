// Bring in dB tables
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');

// Import Category Order
const categoryOrder = require('../config/category_order');

// Import Compute functions
const compareArrays = require('../compute/compare_arrays');
const addCategoryEmoji = require('../compute/add_category_emoji');


async function getUserData(user) {
    try {

        const data = await sequelize.query(
        "SELECT s.id AS store_id, s.store_name AS store_name, s.neighborhood AS neighborhood, c.id AS category_id, c.category_name AS category_name, i.id AS item_id, i.item_name AS item_name FROM item i JOIN store_item si ON i.id = si.item_id JOIN store s ON s.id = si.store_id JOIN category c ON c.id = i.category_id WHERE si.user_username = :user AND i.selected = 1 ORDER BY s.id;", {
            replacements: {
                    user
                },
                type: QueryTypes.SELECT
            }
        );
        addCategoryEmoji(data, "category_id");
        return data;
        
    } catch (err) {
        console.log(`*** ERROR *** dB Query error on Dashboard: ${err}`);
    }
}

function buildStoreInfoArray(data, storeOrder = null) {
    let storeObject = {};
    for (let row of data) {
        if (storeObject[row.store_id]) {
            let categoryFound = false;
            for (let category of storeObject[row.store_id].categories) {
                if (category.category_id === row.category_id) {
                    category.items.push({
                        item_id: row.item_id,
                        item_name: row.item_name
                    });
                    categoryFound = true;
                }
            }
            if (!categoryFound) {
                storeObject[row.store_id].categories.push({
                    category_id: row.category_id,
                    category_name: row.category_name,
                    items: [{
                        item_id: row.item_id,
                        item_name: row.item_name
                    }]
                });
            }
            let {store_item_count: count} = storeObject[row.store_id];
            storeObject[row.store_id].store_item_count = count + 1;
        } else {
            storeObject[row.store_id] = {
                store_id: row.store_id,
                store_name: row.store_name,
                neighborhood: row.neighborhood,
                categories: [{
                    category_id: row.category_id,
                    category_name: row.category_name,
                    items: [{
                        item_id: row.item_id,
                        item_name: row.item_name
                    }]
                }],
                store_item_count: 1
            }
        }
    }

    // Create store array to return
    let storeInfoArray = [];
    for (let id of Object.keys(storeObject)) {
        storeInfoArray.push(storeObject[id]);
    }

    // Sort Stores by # of Items in descending order OR specified order
    if (!storeOrder) storeInfoArray.sort((a,b) => b.store_item_count - a.store_item_count);
    else compareArrays(storeInfoArray, storeOrder, "store_id");

    // Sort Categories by categoryOrder
    for (let store of storeInfoArray) {
        compareArrays(store.categories, categoryOrder, "category_id");
    }

    // Sort Items alphabetically
    for (let store of storeInfoArray) {
        for (let category of store.categories) {
            category.items.sort((a,b) => a.item_name.localeCompare(b.item_name));
        }
    }

    return storeInfoArray;
}



// SELECT all Store and corresponding Item names
exports.currentSelections = async (req,res) => {
    try {
        const allUserData = await getUserData(req.user);
        const storesArray = buildStoreInfoArray(allUserData);
        let storeOrder = storesArray.map(store => store.store_id);
        res.json([storesArray, storeOrder]);
        return;
    } catch (err) {
        console.log('*** ERROR *** Server-side Dashboard Results Error: ' + err);
    };

}

// Select or Deselect single Item
exports.itemSelection = async(req,res) => {

    try {
        const makeSelection = await sequelize.query(
            "UPDATE item SET selected = :value WHERE id = :id;", {
                replacements: {
                    id: req.body.item_id,
                    value: req.body.value
                },
                type: QueryTypes.POST
            }
        );
        const allUserData = await getUserData(req.user);
        const storesArray = buildStoreInfoArray(allUserData, req.body.store_order);
        res.json(storesArray);
        return;
    } catch (err) {
        console.log('*** ERROR *** Server-side Update Item Selection Error: ' + err);
    }
}
