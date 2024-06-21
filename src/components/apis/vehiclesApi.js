import axiosInstance from "../apis/utils/axiosInstance";

const baseURL = 'vehicles';

export const VehicleAPI = {
  getAll: async function (token, accept, contentType) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': `${accept}`,
          contentType: `${contentType}`,
        },
      };
      const response = await axiosInstance.get(baseURL, options);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error occurred while fetching the data:', error);
      throw error;
    }
  },
  getVehiclePositionByLatestOnly: async function (token, accept, vin, triggerFilter, dateType) {
    try {
      const url = 'vehicles/positions/latestOnly';
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': accept,
          'vin': vin,
          'triggerFilter': triggerFilter,
          'dateType': dateType,
        },
      };
      const response = await axiosInstance.get(url, options);
      return response;
    } catch (error) {
      console.error('Error occurred while fetching the data:', error);
      throw error;
    }
  },
  getVehiclePositionByStartTime: async function (token, accept, vin, triggerFilter, dateType, starttime, stoptime) {
    try {
      const url = 'vehicles/positions/starttime';
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': accept,
          'vin': vin,
          'triggerFilter': triggerFilter,
          'dateType': dateType,
          'starttime': starttime,
          'stoptime': stoptime,
        },
      };
      const response = await axiosInstance.get(url, options);
      return response;
    } catch (error) {
      console.error('Error occurred while fetching the data:', error);
      throw error;
    }
  },
  getMoreData: async function (moreData, token, accept) {
    try {
      const url = 'vehicles/moreData';
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': accept,
          'url': moreData,
        },
      };
      const response = await axiosInstance.get(url, options);
      return response;
    } catch (error) {
      console.error('Error occurred while fetching the data:', error);
      throw error;
    }
  },
  login: async function (email, password) {
    try {
      console.log(email);
      console.log("password");
      console.log(password);
      const url = 'vehicles/login';
      const response = await axiosInstance.post(url, {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      console.error('Error occurred while fetching the data:', error);
      throw error;
    }
  },
  getVehiclesStatusesByLatestOnly: async function (token, accept, vin, triggerFilter, dateType, contentFilter) {
    try {
      const url = 'vehicles/statuses/latestOnly';
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': accept,
          'vin': vin,
          'triggerFilter': triggerFilter,
          'dateType': dateType,
          'contentFilter': contentFilter,
        },
      };
      const response = await axiosInstance.get(url, options);
      return response;
    } catch (error) {
      console.error('Error occurred while fetching the data:', error);
      throw error;
    }
  },
  getVehiclesStatusesByStartime: async function (token, accept, vin, triggerFilter, dateType, contentFilter, starttime, stoptime) {
    try {
      const url = 'vehicles/statuses/starttime';
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': accept,
          'vin': vin,
          'triggerFilter': triggerFilter,
          'dateType': dateType,
          'contentFilter': contentFilter,
          'starttime': starttime,
          'stoptime': stoptime,
        },
      };
      const response = await axiosInstance.get(url, options);
      return response;
    } catch (error) {
      console.error('Error occurred while fetching the data:', error);
      throw error;
    }
  },
};
