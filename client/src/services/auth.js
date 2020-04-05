import api from './axios'

const urls = {
  register: '/auth/register',
  login: '/auth/login'
}

function register (credentials) {
  return api.post(urls.register, credentials)
}

function login (credentials) {
  return api.post(urls.login, credentials)
    .then(res => res.data)
}

export default { login, register }
