const { CREATED } = require('http-status-codes');
const msg = require('../config/messages');
const { User } = require('../common/database');

async function register(req, res) {
  const { errors, body } = req;
  if (errors.length) return res.send({ errors, body });
  const user = await User.create(body);
  if (user) res.sendStatus(CREATED);
}

function login({ user }, res) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  const token = user.createToken({ expiresIn: ONE_WEEK });
  const profile = { id: user.id, email: user.email };
  res.send({ token, user: profile });
}

module.exports = { errorHandler, login, register };

function errorHandler(req, _, next) {
  const { email, password, rePassword } = req.body;
  const errors = [];
  if (!email || !password) errors.push(msg.fillFields);
  if (password.length < 8) errors.push(msg.shortPass);
  if (password !== rePassword) errors.push(msg.failedMatch);
  req.errors = errors;
  next();
}
