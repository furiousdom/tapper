const { create, fetch, remove, update } = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.get('/order/all', fetch);
router.post('/order/create', create);
router.patch('/order/:id', update);
router.delete('/order/:id', remove);

module.exports = router;
