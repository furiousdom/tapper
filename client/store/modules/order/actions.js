import api from '@/services/order';

export const fetch = ({ commit }, params) => {
  return api.fetch(params)
    .then(orders => commit('setItems', orders));
};

export const create = ({ commit }, params) => {
  return api.create(params)
    .then(order => commit('addItem', order));
};

export const deliver = ({ commit }, params) => {
  return api.deliver(params)
    .then(order => commit('deliver', order));
};
