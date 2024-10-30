import axios from "axios";
const BASEURL = import.meta.env.VITE_APP_BASE_URL;

export default axios.create({
  baseURL: BASEURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
