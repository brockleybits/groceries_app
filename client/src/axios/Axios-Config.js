import axios from "axios";

const uriLocation = {
    local: "http://localhost:5000/",
    heroku: "https://get-the-groceries.herokuapp.com/"
};

export default axios.create({
  baseURL: uriLocation.heroku,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});
