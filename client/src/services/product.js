import api from './axios';

function fetch() {
  return api.get('/product/');
}

export default { fetch };
