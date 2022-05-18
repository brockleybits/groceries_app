// Import dB config & Sequelize components
const sequelize = require('../config/database');
const { QueryTypes} = require('sequelize');


async function getStores(user) {
    try {        
        return await sequelize.query(
            "SELECT * FROM store WHERE user_username = :user;", {
                replacements: {
                    user
                },
                type: QueryTypes.SELECT
            }
        );
    } catch (err) {
        console.log(`*** ERROR *** Server-side SELECT Stores Error: ${err}`);
    }
}


// SELECT all Category IDs and Names for all Items
exports.selectStores = async(req,res) => {

    try {

        const storeInfo = await getStores(req.user);
        res.json(storeInfo);
        return;

    } catch (err) {
        console.log(`*** ERROR *** Server-side SELECT Stores Error: ${err}`);
    }

}


// INSERT Store
exports.insertStore = async(req,res) => {

    try {
        await sequelize.query(
            "INSERT INTO store(user_username,store_name,neighborhood) VALUES (:user, :store_name, :neighborhood);", {
                replacements: {
                    user: req.user,
                    store_name: req.body.store_name,
                    neighborhood: req.body.neighborhood,
                },
                type: QueryTypes.POST
            }
        );

        const storeInfo = await getStores(req.user);
        res.json(storeInfo);
        return;

    } catch (err) {
        console.log(`*** ERROR *** Server-side INSERT Store Error: ${err}`);
    }


}


// DELETE Store
exports.deleteStore = async(req,res) => {

    try {

        let store_id = req.body.id;

        const itemIdArray = await sequelize.query(
            "SELECT item_id FROM store_item WHERE store_id = :store_id;", {
                replacements: {
                    store_id
                },
                type: QueryTypes.SELECT
            }
        );

        let uniqueItemIds = [];

        if (!!itemIdArray.length) {

            let itemList = [];

            for (item of itemIdArray) itemList.push(item.item_id); 

            const scannedItems = await sequelize.query(
                "SELECT item_id, COUNT(item_id) AS unique FROM store_item WHERE item_id IN (:itemList) GROUP BY item_id;", {
                    replacements: {
                        itemList
                    },
                    type: QueryTypes.SELECT
                }
            );
    
            for (item of scannedItems) {
                if (item.unique === '1') uniqueItemIds.push(item.item_id);
            }
        }

        await sequelize.query(
            "DELETE FROM store_item WHERE store_id = :store_id;", {
                replacements: {
                    store_id
                },
                type: QueryTypes.DELETE
            }
        );

        console.log('Ready to delete Item IDs:');
        console.log(uniqueItemIds);

        if (!!uniqueItemIds.length) {
            await sequelize.query(
                "DELETE FROM item WHERE id IN (:uniques);", {
                    replacements: {
                        uniques: uniqueItemIds
                    },
                    type: QueryTypes.DELETE
                }
            )
        }

        await sequelize.query(
            "DELETE FROM store WHERE id = :store_id;", {
                replacements: {
                    store_id
                },
                type: QueryTypes.DELETE
            }
        );

        const storeInfo = await getStores(req.user);
        res.json(storeInfo);
        return;

    } catch (err) {
        console.log(`*** ERROR *** Server-side DELETE Store Error: ${err}`);
    }

}


// GET existing Store
exports.getStore = async(req,res) => {

    try {        
        const singleStore = await sequelize.query(
            "SELECT id, store_name, neighborhood FROM store WHERE id = :store_id;", {
                replacements: {
                    store_id: req.body.id
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(singleStore);
        return;

    } catch (err) {
        console.log(`*** ERROR *** Server-side SELECT single Store Error: ${err}`);
    }

}


// UPDATE Store
exports.editStore = async(req,res) => {

    try {

        await sequelize.query(
            "UPDATE store SET store_name = :store_name, neighborhood = :neighborhood WHERE id = :store_id;", {
                replacements: {
                    store_id: req.body.store_id,
                    store_name: req.body.store_name,
                    neighborhood: req.body.neighborhood
                },
                type: QueryTypes.POST
            }
        );

        const storeInfo = await getStores(req.user);
        res.json(storeInfo);
        return;

    } catch (err) {
        console.log(`*** ERROR *** Server-side UPDATE Store Error: ${err}`);
    }

}