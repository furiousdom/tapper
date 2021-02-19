const { create, fetch, get, remove, update } = require('./product.controller');
const express = require('express');
const router = express.Router();

router
  .get('/', fetch)
  .post('/', create)
  .get('/:id', get)
  .patch('/:id', update)
  .delete('/:id', remove);

module.exports = {
  path: '/product',
  router
};
