import api from '@/services/auth';

export const login = ({ commit }, credentials) => {
  return api.login(credentials)
    .then(({ user, token }) => commit('login', { user, token }));
};

export const logout = ({ commit }) => commit('logout');
