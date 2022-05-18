import http from "./Axios-Config";

// Define methods to use in components for http requests to the Functions table
const getAll = () => {
  return http.get('/api/stores');
};

const addStore = store => {
  return http.post('/api/stores', store);
}

const deleteStore = id => {
  return http.delete('/api/stores', {data: {id}});
}

const getStore = id => {
    return http.post('/api/stores/get-store', {id});
}

const editStore = store => {
    return http.post('/api/stores/edit', store);
}


const axiosRequest = {
  getAll,
  addStore,
  deleteStore,
  getStore,
  editStore
};

export default axiosRequest;