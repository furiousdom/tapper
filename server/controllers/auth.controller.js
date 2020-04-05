const config = require('../config/config');
const jwt = require('jsonwebtoken');
const msg = require('../config/messages');
const { User } = require('../database');

async function register(req, res) {
  const { errors, body: { name, email, password, rePassword } } = req;
  const payload = { errors, name, email, password, rePassword };
  if (errors.length) return res.send(payload);
  try {
    const user = await User.create(req.body);
    if (user) res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(403).send({ error: msg.loginFailed });
    const isPasswordValid = await user.authenticate(password);
    if (!isPasswordValid) return res.status(403).send({ error: msg.wrongPassword });
    const userJson = user.toJSON();
    res.send({
      user: userJson,
      token: jwtSignUser(userJson)
    });
  } catch (err) {
    res.status(500).send({ error: msg.serverError });
  }
}

module.exports = { errorHandler, login, register };

function errorHandler(req, _, next) {
  const { username, password } = req.body;
  const errors = [];
  if (!username || !password) errors.push(msg.fillFields);
  if (password.length < 8) errors.push(msg.shortPass);
  req.errors = errors;
  next();
}

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}
