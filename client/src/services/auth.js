import api from './axios';
import path from 'path';

const urls = {
  root: '/auth',
  register: () => path.join(this.root, '/register'),
  login: () => path.join(this.root, '/login')
};

function register(credentials) {
  return api.post(urls.register, credentials);
}

function login(credentials) {
  return api.post(urls.login, credentials)
    .then(res => res.data);
}

export default { login, register };
