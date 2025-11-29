import axios from "axios";
import {
  LOCAL_STORAGE_NAME,
  SUCCESS_CODE,
} from "../utils/constant";

axios.defaults.timeout = 30000;
axios.defaults.timeoutErrorMessage = "timeout";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_NAME.TOKEN);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["X-Request-Source"] = "web-app";
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error) 
);

export default http;
