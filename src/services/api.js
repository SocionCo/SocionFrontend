import axios from 'axios';

const api = axios.create({
  baseURL: 'http://socion.herokuapp.com'
});

export default api;