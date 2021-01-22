import axios from 'axios';

const authScheme = process.env.AUTH_JWT_SCHEME || 'Bearer';

const config = {
  headers: { 'Content-Type': 'application/json' },
  baseURL: '/api'
};
const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `${authScheme} ${token}`;
  return config;
});

export default axiosInstance;
