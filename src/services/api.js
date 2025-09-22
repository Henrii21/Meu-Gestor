import axios from "axios";

const api = axios.create({
  baseURL: "https://api-node-test-6c4b0a5d4c87.herokuapp.com",
});

export default api;
