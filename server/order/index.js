const ctrl = require('./order.controller');
const express = require('express');
const router = express.Router();

router
  .get('/closed', ctrl.getClosed)
  .get('/opened', ctrl.getOpen)
  .post('/create', ctrl.create)
  .patch('/:id', ctrl.update)
  .patch('/:id/close', ctrl.setClosed)
  .delete('/:id', ctrl.remove);

module.exports = {
  path: '/order',
  router
};
