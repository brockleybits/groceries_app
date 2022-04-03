/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Gather current shopping list categorized by store
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
