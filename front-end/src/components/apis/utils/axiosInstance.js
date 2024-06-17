import axios from "axios";

const baseURL = 'https://primary:XXDWQ7wEBHKIfOCQLRPiCwLTiva4JIvYYX83wgAHb3oSy21e1mlAjeteFqhN593H@dpli.test.azuremicroservices.io/test/default/';
const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;