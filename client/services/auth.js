import api from './request';
import path from 'path';

const urls = {
  root: 'user',
  register: () => path.join(urls.root, 'register'),
  login: () => path.join(urls.root, 'login')
};

function register(credentials) {
  return api.post(urls.register(), credentials);
}

function login(credentials) {
  return api.post(urls.login(), credentials)
    .then(res => res.data);
}

export default { login, register };
