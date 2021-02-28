const { create, fetch, get, remove, update } = require('./product.controller');
const { createError } = require('../common/errors');
const express = require('express');
const { NOT_FOUND } = require('http-status-codes');
const { Product } = require('../common/database');
const router = express.Router();

router
  .get('/', fetch)
  .post('/', create);

router
  .param('productId', getProduct)
  .get('/:productId', get)
  .patch('/:productId', update)
  .delete('/:productId', remove);

async function getProduct(req, res, next, productId) {
  const product = await Product.findByPk(productId);
  if (!product) return createError(NOT_FOUND, 'Product doesn\'t exist.');
  req.product = product;
  next();
}

module.exports = {
  path: '/product',
  router
};
