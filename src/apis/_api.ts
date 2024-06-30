import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  function (res: AxiosRequestConfig) {
    if (res) {
      return res;
    }
    return [];
  },
  function (error: AxiosError) {
    if (error) {
      if (error.message) {
        return Promise.reject(error.message);
      }
      return Promise.reject(error);
    }
  }
);

export default api;
