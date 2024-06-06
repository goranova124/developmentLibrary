const request = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error occurred while making request:', error);
      throw error;
    }
  };
  
  export default request;