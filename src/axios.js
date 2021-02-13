import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080/api"
  baseURL: "https://pure-fjord-67976.herokuapp.com/api",
});
export default instance;
