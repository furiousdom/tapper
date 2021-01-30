export const setOpenOrder = (state, order) => {
  state.openOrder = order;
};

export const unsetOpenOrder = state => {
  state.openOrder = null;
};

export const setDeliveredOrders = (state, orders) => {
  state.deliveredOrders = orders;
};

export const unsetDeliveredOrders = state => {
  state.deliveredOrders = null;
};

export const unsetAllOrders = state => {
  Object.assign(state, { openOrder: null, deliveredOrders: null });
};
