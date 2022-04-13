import axios from "axios";

export default axios.create({
  baseURL: "https://get-the-groceries.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});
