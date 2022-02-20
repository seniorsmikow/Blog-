import axios from "axios";

const instance = axios.create({
  baseURL: "/",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("tokenBlog");
  return config;
});

export { instance };
