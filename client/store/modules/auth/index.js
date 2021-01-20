import * as actions from './actions';
import * as mutations from './mutations';

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
