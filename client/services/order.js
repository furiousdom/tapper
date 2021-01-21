import api from './request';
import path from 'path';

const urls = {
  root: 'order',
  fetchOne: () => path.join(urls.root, 'fetch-one'),
  create: () => path.join(urls.root, 'create')
};

async function fetch(params = {}) {
  const { data } = await api.get(urls.root, { params });
  return data.map(order => ({ ...order, createdAt: new Date(order.createdAt) }));
}

async function fetchOne(params = {}) {
  const { data } = await api.get(urls.fetchOne(), { params });
  return data ? { ...data, createdAt: new Date(data.createdAt) } : null;
}

function create(params) {
  return api.post(urls.create(), params);
}

export default { create, fetch, fetchOne };
