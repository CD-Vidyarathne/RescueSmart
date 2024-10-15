import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://rescuesmart.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
