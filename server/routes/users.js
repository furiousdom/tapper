const { logout, register } = require('../controllers/users.controller');
const express = require('express');
const msg = require('../config/messages');
const passport = require('passport');
const router = express.Router();

const authenticateOptions = {
  successRedirect: '/dashboard',
  failureRedirect: '/users/login'
};

router.get('/logout', logout);

router.post('/register', errorHandler, register);
router.post('/login', passport.authenticate('local', authenticateOptions));

module.exports = router;

function errorHandler(req, _, next) {
  const { name, address, username, email, password, rePassword } = req.body;
  const errors = [];
  if (!name || !address || !username || !email || !password || !rePassword) errors.push(msg.fillFields);
  if (password !== rePassword) errors.push(msg.failedMatch);
  if (password.length < 8) errors.push(msg.short);
  req.errors = errors;
  next();
}
