import * as actions from './actions';
import * as mutations from './mutations';

const state = {
  user: null,
  token: null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
