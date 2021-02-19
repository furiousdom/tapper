export const setOrder = (state, order) => {
  state.order = order;
};

export const unsetOrder = state => {
  state.order = null;
};

export const setItems = (state, orders) => {
  state.items = orders;
};

export const unsetItems = state => {
  state.items = null;
};

export const addItem = (state, order) => {
  state.items.unshift(order);
};

export const deliver = (state, updatedOrder) => {
  const activeOrder = state.items.find(order => order.id === updatedOrder.id);
  activeOrder.status = updatedOrder.status;
};

export const unsetAllOrders = state => {
  Object.assign(state, { order: null, items: null });
};
