const { create, fetch, fetchOne, remove, update } = require('./order.controller');
const express = require('express');
const router = express.Router();

router
  .get('/', fetch)
  .get('/fetch-one', fetchOne)
  .post('/create', create)
  .patch('/:id', update)
  .delete('/:id', remove);

module.exports = {
  path: '/order',
  router
};
