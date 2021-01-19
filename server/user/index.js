const { errorHandler, login, register } = require('./user.controller');
const express = require('express');
const router = express.Router();

router
  .post('/login', login)
  .post('/register', errorHandler, register);

module.exports = {
  path: '/user',
  router
};
