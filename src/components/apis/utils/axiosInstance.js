import axios from "axios";

const baseURL = 'http://3.71.115.121/';
const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;