const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const { authentication: { jwtSecret } } = require('../../config/config');
const passport = require('passport');
const { User } = require('../database');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  return User.findOne({ id: payload.id })
    .then(user => done(null, user || false))
    .catch(err => done(err));
});

passport.use(jwtStrategy);

module.exports = passport;
