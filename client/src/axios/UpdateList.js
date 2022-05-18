/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Define methods to use in components for http requests to the Functions table
const getAll = () => {
  return http.get('/api/shopping-list');
};

const updateItemSelection = itemInfo => {
    return http.post('/api/shopping-list/selection', {
        item_id: itemInfo.item_id,
        value: itemInfo.value
    });
}

const searchItems = pattern => {
    return http.post('/api/shopping-list/search', pattern);
}

const deleteItem = id => {
    return http.delete('/api/shopping-list', {
        data: {id}
    });
  }
  
  const addItem = info => {
      return http.post('/api/shopping-list', info);
  }
  
  const getItem = (id) => {
      return http.put('/api/shopping-list/edit', {
          data: id
      });
    };
  
  const editItem = info => {
      return http.post('/api/shopping-list/edit', info);
  }


// Export "Methods"
export default {
  getAll,
  updateItemSelection,
  searchItems,
  deleteItem,
  addItem,
  getItem,
  editItem
};