const { create, fetch, getQuantity, remove, update } = require('./brand.controller');
const express = require('express');
const router = express.Router();

router
  .get('/', fetch)
  .post('/create', create)
  .patch('/:id', update)
  .delete('/:id', remove)
  .get('/:id/quantity', getQuantity);

module.exports = {
  path: '/brand',
  router
};
