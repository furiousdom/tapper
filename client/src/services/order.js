import api from './axios';

async function fetch(params = {}) {
  const { data } = await api.get('/order/all', { params });
  return data.map(order => ({ ...order, date: new Date(order.date) }));
}

async function create(params) {
  return await api.post('/order/create', params);
}

export default { create, fetch };
