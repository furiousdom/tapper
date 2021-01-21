const { errorHandler, login, register } = require('./user.controller');
const auth = require('../common/auth');
const express = require('express');
const router = express.Router();

router
  .post('/login', auth.authenticate('local'), login)
  .post('/register', errorHandler, register);

module.exports = {
  path: '/user',
  router
};
