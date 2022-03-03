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
    return http.put('/edit-item', {
        data: id
    });
  };

  const editItem = info => {
    return http.post('/edit-item', info);
}


// Export "Methods"
export default {
  getAll,
  deleteItem,
  addItem,
  getItem,
  editItem
};