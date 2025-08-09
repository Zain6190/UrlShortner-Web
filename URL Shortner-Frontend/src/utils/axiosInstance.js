//create instance of axios with base URL
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
  
    console.log('Request sent:', config);
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    console.error('Response error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
