const { create, fetch, remove, update } = require('../controllers/product.controller');
const express = require('express');
const router = express.Router();

router.get('/all', fetch);
router.post('/create', create);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;