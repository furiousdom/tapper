const brand = require('./brand');
const express = require('express');
const order = require('./order');
const passport = require('passport');
const product = require('./product');
const user = require('./user');

const router = express.Router();

const authenticate = passport.authenticate('jwt', { session: false });

router.use(user.path, user.router);
router.use(brand.path, authenticate, brand.router);
router.use(order.path, authenticate, order.router);
router.use(product.path, authenticate, product.router);

module.exports = router;
