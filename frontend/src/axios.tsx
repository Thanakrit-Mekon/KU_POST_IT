import axios from "axios";

const instance = axios.create({
  // baseURL: "https://ku-post-it-backend.herokuapp.com/",
  // baseURL: "http://localhost:3000/",
  baseURL: "http://139.59.244.209/",
  timeout: 20000,
  // baseURL: "https://1158-113-53-146-170.ngrok.io/",
  // timeout: 20000,
});

export default instance;
