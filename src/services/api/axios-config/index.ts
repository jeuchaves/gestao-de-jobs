import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
const apiUrl = import.meta.env.VITE_API_URL;

const Api = axios.create({
  baseURL: apiUrl,
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };
