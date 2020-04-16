const { create, fetch, remove, update } = require('./brand.controller');
const express = require('express');
const router = express.Router();

router
  .get('/all', fetch)
  .post('/create', create)
  .patch('/:id', update)
  .delete('/:id', remove);

module.exports = router;
