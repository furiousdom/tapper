import api from './axios';

function fetch() {
  return api.get('/product/all');
}

export default { fetch };
