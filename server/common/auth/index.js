const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const { auth: config } = require('../../config');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const { User } = require('../database');

const options = {
  usernameField: 'email',
  session: false
};

passport.use(new LocalStrategy(options, (email, password, done) => {
  return User.findOne({ where: { email } })
    .then(user => user && user.authenticate(password))
    .then(user => done(null, user || false))
    .error(err => done(err, false));
}));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(config.scheme),
  secretOrKey: config.secret
};

passport.use(new JwtStrategy(jwtOptions, ({ id }, done) => {
  return User.findOne({ id })
    .then(user => done(null, user || false))
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = {
  initialize(options = {}) {
    return passport.initialize(options);
  },
  authenticate(strategy, options = {}) {
    return passport.authenticate(strategy, { ...options, failWithError: true });
  }
};
