const auth = require('./auth');
const brand = require('./brand');
const express = require('express');
const order = require('./order');
const product = require('./product');

const router = express.Router();

router.use(auth.path, auth.router);
router.use(brand.path, brand.router);
router.use(order.path, order.router);
router.use(product.path, product.router);

module.exports = router;
