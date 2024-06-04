import axios from "axios";
import request from "./utils/request";

const baseURL = 'http://localhost:8080/vehicles';
export default axios.create({
    baseURL
})

export const VehicleAPI = {


    getAll: function (token, accept, contentType) {

        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': `${accept}`,
                'ContentType': `${contentType}`,

            },

        }

        return request(baseURL, options);
    },
    getVehiclePositionBylatestOnly(token, accept, vin, triggerFilter, dateType) {

        const url = 'http://localhost:8080/vehicles/positions/latestOnly';
        console.log(accept);
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                accept: accept,
                vin: `${vin}`,
                triggerFilter: `${triggerFilter}`,
                dateType: `${dateType}`
            },

        };
        return request(url, options);

    },
    getVehiclePositionByStartTime(token, accept, vin, triggerFilter, dateType, starttime, stoptime) {
        console.log("de");
        const url = 'http://localhost:8080/vehicles/positions/starttime';
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                accept: accept,
                vin: `${vin}`,
                triggerFilter: `${triggerFilter}`,
                dateType: `${dateType}`,
                starttime: `${starttime}`,
                stoptime: `${stoptime}`,
                // lastVin: `${lastVin}`,
            },

        };
        return request(url, options);

    }
    ,
    getMoreData(moreData, token, accept) {
        const url = 'http://localhost:8080/vehicles/moreData';
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                accept: accept,
                url: `${moreData}`,
            },

        };
        return request(url, options);
    }
    ,
    login(email, password) {
        console.log(email);
        const url = 'http://localhost:8080/vehicles/login';
        const options = {
            method: 'POST'
            , headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password,
                })

        };

        return request(url, options);
    },
    getVehiclesStatusesBylatestOnly(token, accept, vin, triggerFilter, dateType, contentFilter) {

        const url = 'http://localhost:8080/vehicles/statuses/latestOnly';
        console.log(accept);
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                accept: accept,
                vin: `${vin}`,
                triggerFilter: `${triggerFilter}`,
                dateType: `${dateType}`,
                contentFilter: `${contentFilter}`,
            },

        };
        return request(url, options);

    }, getVehiclesStatusesByStartime(token, accept, vin, triggerFilter, dateType, contentFilter, starttime, stoptime) {
        console.log("dw");
        const url = 'http://localhost:8080/vehicles/statuses/starttime';
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                accept: accept,
                vin: `${vin}`,
                triggerFilter: `${triggerFilter}`,
                dateType: `${dateType}`,
                contentFilter: `${contentFilter}`, starttime: `${starttime}`,
                stoptime: `${stoptime}`,
            },

        };
        return request(url, options);

    },



}