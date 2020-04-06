import api from './axios';
import path from 'path';

const urls = {
  root: '/auth',
  register: '/register',
  login: '/login'
};

function register(credentials) {
  return api.post(path.join(urls.root, urls.register), credentials);
}

function login(credentials) {
  return api.post(path.join(urls.root, urls.login), credentials)
    .then(res => res.data);
}

export default { login, register };
