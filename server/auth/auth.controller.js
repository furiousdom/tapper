const config = require('../config/config');
const jwt = require('jsonwebtoken');
const msg = require('../config/messages');
const status = require('http-status-codes');
const { User } = require('../shared/database');

async function register(req, res) {
  const { errors, body } = req;
  if (errors.length) return res.send({ errors, body });
  try {
    const user = await User.create(body);
    if (user) res.sendStatus(status.CREATED);
  } catch (err) {
    res.status(status.BAD_REQUEST).send(err);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(status.FORBIDDEN).send({ error: msg.loginFailed });
    const isPasswordValid = await user.authenticate(password);
    if (!isPasswordValid) return res.status(status.FORBIDDEN).send({ error: msg.wrongPassword });
    const userJson = user.toJSON();
    res.send({
      user: userJson,
      token: jwtSignUser(userJson)
    });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error: msg.serverError });
  }
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

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}
