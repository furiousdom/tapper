const auth = require('./common/auth');
const brand = require('./brand');
const express = require('express');
const order = require('./order');
const product = require('./product');
const user = require('./user');

const router = express.Router();

const authenticate = auth.authenticate('jwt', { session: false });

router.use(user.path, user.router);
router.use(authenticate);
router.use(brand.path, brand.router);
router.use(order.path, order.router);
router.use(product.path, product.router);

module.exports = router;
