import axios, { AxiosInstance } from "axios";
import { url } from "@/data/connections/mainApi";

export const api: AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("rt__SistEstudiantil");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
