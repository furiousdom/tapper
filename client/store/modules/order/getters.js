export const activeOrder = state => {
  return state.items.find(order => order.status !== 'Delivered');
};

export const deliveredOrders = state => {
  return state.items.filter(order => order.status === 'Delivered');
};
