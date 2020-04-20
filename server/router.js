const brand = require('./brand');
const express = require('express');
const order = require('./order');
const product = require('./product');
const user = require('./user');

const router = express.Router();

router.use(user.path, user.router);
router.use(brand.path, brand.router);
router.use(order.path, order.router);
router.use(product.path, product.router);

module.exports = router;
