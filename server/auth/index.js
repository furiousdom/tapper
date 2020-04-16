const { errorHandler, login, register } = require('./auth.controller');
const express = require('express');
const router = express.Router();

router
  .post('/register', errorHandler, register)
  .post('/login', login);

module.exports = router;
