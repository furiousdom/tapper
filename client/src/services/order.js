import api from './axios';

async function fetch(params = {}) {
  const { data } = await api.get('/user/order/all', { params });
  return data.map(order => ({ ...order, date: new Date(order.date) }));
}

export default { fetch };
