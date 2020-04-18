import api from './axios';

async function fetch(params = {}) {
  const { data } = await api.get('/order/', { params });
  return data.map(order => ({ ...order, date: new Date(order.date) }));
}

function create(params) {
  return api.post('/order/create', params);
}

export default { create, fetch };
