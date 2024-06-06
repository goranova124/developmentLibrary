
import axiosInstance from "../apis/utils/axiosInstance";

export const ApisDetails = {
  getAll: async function () {
    try {
        const url="apis"
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error occurred while fetching the data:', error);
      throw error;
    }
  },
};