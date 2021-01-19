import api from './request';
import path from 'path';

const urls = {
  root: 'brand',
  quantity: id => path.join(urls.root, String(id), 'quantity')
};

function getQuantity({ id, divisor }) {
  return api.get(urls.quantity(id), { divisor });
}

export default { getQuantity };
