import { CREATED, OK } from 'http-status-codes';
import api from '@/services/order';

export const getClosed = ({ commit }, params) => {
  return api.getClosed(params)
    .then(orders => commit('setDeliveredOrders', orders));
};

export const getOpen = ({ commit }, params) => {
  return api.getOpen(params)
    .then(order => commit('setOpenOrder', order));
};

export const create = ({ commit }, params) => {
  return api.create(params)
    .then(response => {
      const { status, data: order } = response;
      if (status === CREATED) commit('setOpenOrder', order);
    });
};

export const setClosed = ({ commit }, { userId, ...params }) => {
  return api.setClosed(params)
    .then(response => {
      const { status } = response;
      if (status === OK) {
        commit('unsetOpenOrder');
        return api.getClosed({ userId })
          .then(orders => commit('setDeliveredOrders', orders));
      }
      return response;
    });
};
