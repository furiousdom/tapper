import api from './axios';
import { join } from 'path';

const urls = {
  root: '/order',
  create: () => join(urls.root, '/create')
};

async function fetch(params = {}) {
  const { data } = await api.get(urls.root, { params });
  return data.map(order => ({ ...order, date: new Date(order.date) }));
}

function create(params) {
  return api.post(urls.create(), params);
}

export default { create, fetch };
