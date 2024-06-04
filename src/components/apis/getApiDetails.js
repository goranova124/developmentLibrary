import axios from "axios";
import request from "./utils/request";

const baseURL = 'http://localhost:8080/apis';
export default axios.create({
    baseURL
})

export const ApisDetails =  {
    getAll: function () {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }

        return request(baseURL, options);
    },
};


