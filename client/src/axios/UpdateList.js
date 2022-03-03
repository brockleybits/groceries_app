/* eslint-disable import/no-anonymous-default-export */
import http from "./Axios-Config";

// Define methods to use in components for http requests to the Functions table
const getAll = () => {
  return http.get('/update-list');
};

const updateSelections = selectionArray => {
    return http.post('/update-list', {
        unselected: selectionArray[0],
        selected: selectionArray[1]
    });
}

// Export "Methods"
export default {
  getAll,
  updateSelections
};