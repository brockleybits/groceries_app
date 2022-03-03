/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Define methods to use in components for http requests to the Functions table

const deselectItems = idArray => {
  return http.post('/deselect-items', { deselect: idArray })
}

// Export "Methods"
export default {
  deselectItems
};
