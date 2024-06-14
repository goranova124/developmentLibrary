import axios from "axios";

const baseURL = 'https://dpli.test.azuremicroservices.io/test/default/';

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
