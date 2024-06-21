import axios from "axios";

const baseURL = 'https://developerlibrary-developerlibrary.azuremicroservices.io/';
// const baseURL = 'http://localhost:8080/';

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
