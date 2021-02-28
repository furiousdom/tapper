import api from '@/services/auth';
import axios from '@/services/request';

export const login = ({ commit }, credentials) => {
  return api.login(credentials)
    .then(response => {
      const { user, token } = response;
      commit('login', { user, token });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response;
    });
};

export const logout = ({ commit }) => {
  commit('logout');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete axios.defaults.headers.Authorization;
  return Promise.resolve(true);
};
