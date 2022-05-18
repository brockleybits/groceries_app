/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Gather current shopping list categorized by store
const getAll = () => {
  return http.get('/api/current-list');
};

const updateItemSelection = itemInfo => {
    return http.post('/api/current-list/selection', {
        item_id: itemInfo.item_id,
        value: itemInfo.value,
        store_order: itemInfo.store_order
    });
}

// Export "Methods"
export default {
  getAll,
  updateItemSelection
};
