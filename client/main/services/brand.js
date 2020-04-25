import api from './request';
import { join } from 'path';

const urls = {
  root: '/brand',
  quantity: id => join(urls.root, `/${id}`, '/quantity')
};

function getQuantity({ id, divisor }) {
  return api.get(urls.quantity(id), { divisor });
}

export default { getQuantity };
