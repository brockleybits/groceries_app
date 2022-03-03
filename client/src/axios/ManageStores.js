/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Define methods to use in components for http requests to the Functions table
const getAll = () => {
  return http.get('/stores');
};

const addStore = store => {
  return http.post('/stores', store)
}

// Export "Methods"
export default {
  getAll,
  addStore
};