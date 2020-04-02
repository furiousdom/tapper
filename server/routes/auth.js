const { errorHandler, login, register } = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/register', errorHandler, register);
router.post('/login', login);

module.exports = router;
