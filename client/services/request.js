import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
  baseURL: 'http://localhost:5000/api'
};
const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
