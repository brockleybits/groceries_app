/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Define methods to use in components for http requests to the Functions table
const getAll = () => {
  return http.get('/items');
};

const deleteItem = id => {
  return http.delete('/items', {
      data: {id}
  });
}

const addItem = info => {
    return http.post('/items', info);
}

const getItem = (id) => {
    return http.put('/items/edit', {
        data: id
    });
  };

const editItem = info => {
    return http.post('/items/edit', info);
}

const deselectItems = idArray => {
    return http.post('/items/deselect', { deselect: idArray })
  }


// Export "Methods"
export default {
  getAll,
  deleteItem,
  addItem,
  getItem,
  editItem,
  deselectItems
};