const { User } = require('../database');
const msg = require('../config/messages');

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

function logout(req, res) {
  req.logout();
  res.redirect('/users/login');
}

module.exports = { logout, register };
