const express = require('express');
const ordersController = require('../controllers/orders.controller');
const router = express.Router();

router.get('/', ordersController.fetch);

module.exports = router;
