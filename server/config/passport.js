const LocalStrategy = require('passport-local');

const { User } = require('../database');
const msg = require('./messages');

function verifyLocal(username, password, done) {
  return User.findOne({ username })
    .then(user => {
      if (!user) return done(null, false, msg.notRegistered);
      return user.authenticate(password)
        ? done(null, user)
        : done(null, false, msg.wrongPassword);
    })
    .catch(err => done(err));
}

module.exports = passport => {
  passport.use(new LocalStrategy({ usernameField: 'username' }, verifyLocal));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return User.findById(id, (err, user) => done(err, user));
  });
};
