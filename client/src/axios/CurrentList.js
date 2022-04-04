/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Gather current shopping list categorized by store
const getAll = () => {
  return http.get('/current-list');
};

// Export "Methods"
export default {
  getAll
};
