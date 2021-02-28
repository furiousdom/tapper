import api from './request';
import path from 'path';

const urls = {
  root: 'order',
  deliver: id => path.join(urls.root, String(id), 'deliver')
};

async function fetch(params = {}) {
  const { data } = await api.get(urls.root, { params });
  return data.map(order => ({ ...order, createdAt: new Date(order.createdAt) }));
}

async function create(params = {}) {
  const { data } = await api.post(urls.root, params);
  return data ? { ...data, createdAt: new Date(data.createdAt) } : null;
}

async function deliver({ orderId, ...params }) {
  const { data } = await api.patch(urls.deliver(orderId), params);
  return data ? { ...data, createdAt: new Date(data.createdAt) } : null;
}

export default { fetch, create, deliver };
