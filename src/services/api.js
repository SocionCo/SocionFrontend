import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://localhost:8080'
  baseURL: 'https://socion.herokuapp.com'
});

export default api;