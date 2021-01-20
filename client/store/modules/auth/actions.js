import api from '@/services/auth';
import axios from '@/services/request';

export const login = ({ commit }, credentials) => {
  return new Promise((resolve, reject) => {
    return api.login(credentials)
      .then(response => {
        const { user, token } = response;
        commit('login', { user, token });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        resolve(response);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

export const logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.Authorization;
    resolve();
  });
};
