const { User } = require('../database');
const msg = require('../config/messages');
const passport = require('passport');

function register(req, res) {
  const { errors, body: { name, address, username, email, password, rePassword } } = req;
  const payload = { errors, body: { name, address, username, email, password, rePassword } };
  if (errors.length) return res.render('register', payload);
  return User.findOne({ where: { username } })
    .then(user => {
      if (user) {
        payload.errors.push(msg.exists);
        return res.render('register', payload);
      }
      const newUser = User.create(payload.body);
      res.send(newUser.toJSON());
      // return newUser.encryptPassword()
      //   .then(() => {
      //     req.flash(msg.regComplete.label, msg.regComplete.text);
      //     res.redirect('/users/login');
      //   })
      //   .catch(err => next(err));
    });
}

function login(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : msg.loginFailed,
        user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) res.send(err);
      const message = msg.loginSuccess;
      return res.status(200).json({ user, message });
    });
  })(req, res, next);
}

function logout(req, res) {
  req.logout();
  res.json(msg.logoutComplete);
}

module.exports = { login, logout, register };
