const { OldUser } = require('../database');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await OldUser.create(req.body);
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        error: err
      });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await OldUser.findOne({ where: { username } });
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        });
      }
      const isPasswordValid = await user.authenticate(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The password information was incorrect.'
        });
      }
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in.'
      });
    }
  }
};
