import http from "./Axios-Config";

// Define methods to use in components for http requests to the Functions table
const getAll = () => {
  return http.get('/stores');
};

const addStore = store => {
  return http.post('/stores', store);
}

const deleteStore = id => {
  return http.delete('/stores', {
      data: {id}
  });
}

const axiosRequest = {
  getAll,
  addStore,
  deleteStore
};

export default axiosRequest;