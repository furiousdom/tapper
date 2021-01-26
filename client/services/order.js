import api from './request';
import path from 'path';

const urls = {
  root: 'order',
  pastOrders: () => path.join(urls.root, 'closed'),
  getOpen: () => path.join(urls.root, 'opened'),
  create: () => path.join(urls.root, 'create'),
  setClosed: id => path.join(urls.root, String(id), 'close')
};

async function getClosed(params = {}) {
  const { data } = await api.get(urls.pastOrders(), { params });
  return data.map(order => ({ ...order, createdAt: new Date(order.createdAt) }));
}

async function getOpen(params = {}) {
  const { data } = await api.get(urls.getOpen(), { params });
  return data ? { ...data, createdAt: new Date(data.createdAt) } : null;
}

function create(params = {}) {
  return api.post(urls.create(), params);
}

function setClosed({ orderId, ...params }) {
  return api.patch(urls.setClosed(orderId), params);
}

export default { create, getClosed, getOpen, setClosed };
