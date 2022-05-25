const compareArrays = require('./compare_arrays');
const categoryOrder = require('../config/category_order');

module.exports = function(table) {

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