/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Define methods to use in components for http requests to the Functions table
const getAll = () => {
  return http.get('/current-list');
};

const addNew = resource => {
  return http.post('/add-resource', resource)
}

// Export "Methods"
export default {
  getAll,
  addNew
};
