import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'https://socion.herokuapp.com'
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request config before sending it
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle response error
    console.error('Response error:', error);

    // Customize the error handling based on your needs
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Status code:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
