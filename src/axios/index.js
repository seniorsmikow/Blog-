import axios from "axios";

const instance = axios.create({
  baseURL: "/",
  headers: {
    Authorization: window.localStorage.getItem("tokenBlog"),
  },
});

instance.interceptors.request.use((config) => {
  config.headers["token"] = window.localStorage.getItem("tokenBlog");
  return config;
});

export { instance };
