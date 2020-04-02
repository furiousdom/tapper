const { create, fetch, remove, update } = require('../controllers/brand.controller');
const express = require('express');
const router = express.Router();

router.get('/', fetch);
router.post('/create', create);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;
