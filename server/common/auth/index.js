const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const { authentication: { jwtSecret } } = require('../../config');
const passport = require('passport');
const { User } = require('../database');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

passport.use(new JwtStrategy(options, ({ id }, done) => {
  return User.findOne({ id })
    .then(user => done(null, user || false))
    .catch(err => done(err));
}));

module.exports = {
  initialize(options = {}) {
    return passport.initialize(options);
  },
  authenticate(strategy, options = {}) {
    return passport.authenticate(strategy, { ...options, failWithError: true });
  }
};
