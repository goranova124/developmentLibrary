import axios from "axios";

const baseURL = 'https://developerlibrary-developerlibrary.azuremicroservices.io/';

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
