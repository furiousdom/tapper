import api from './request';

const urls = {
  root: 'product'
};

function fetch() {
  return api.get(urls.root);
}

export default { fetch };
