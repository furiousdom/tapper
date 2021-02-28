const { createError } = require('../common/errors');
const ctrl = require('./order.controller');
const express = require('express');
const { NOT_FOUND } = require('http-status-codes');
const { Order } = require('../common/database');
const router = express.Router();

router
  .get('/', ctrl.fetch)
  .post('/', ctrl.create);

router
  .param('orderId', getOrder)
  .patch('/:orderId', ctrl.update)
  .patch('/:orderId/deliver', ctrl.deliver)
  .delete('/:orderId', ctrl.remove);

async function getOrder(req, res, next, orderId) {
  const order = await Order.findByPk(orderId);
  if (!order) return createError(NOT_FOUND, 'Order doesn\'t exist.');
  req.order = order;
  next();
}

module.exports = {
  path: '/order',
  router
};
