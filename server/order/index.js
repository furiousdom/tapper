const { create, fetch, remove, update } = require('./order.controller');
const express = require('express');
const router = express.Router();

router
  .get('/', fetch)
  .post('/create', create)
  .patch('/:id', update)
  .delete('/:id', remove);

module.exports = {
  path: '/order',
  router
};
