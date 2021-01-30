import * as actions from './actions';
import * as mutations from './mutations';

const state = {
  openOrder: {},
  deliveredOrders: []
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
