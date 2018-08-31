
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = (passport) => {
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, { message: 'user already exists' });
      }
      req.session.username = username;
      const newUser = new User({
        username,
        password,
      });
      return newUser.save((error) => {
        if (error) {
          return done(error);
        }
        req.session.user = newUser;
        return done(null, newUser);
      });
    });
  }));
};
