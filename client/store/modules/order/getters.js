import { DELIVERED } from '@/../common/config/orderStatus';

export const activeOrder = state => {
  return state.items.find(order => order.status !== DELIVERED);
};

export const deliveredOrders = state => {
  return state.items.filter(order => order.status === DELIVERED);
};
