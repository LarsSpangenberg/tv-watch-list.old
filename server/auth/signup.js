
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = (passport) => {
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    User.findOne({ username }, (err, user) => {
      console.log(`Attempting to create new user: ${username}`);
      if (err) {
        console.log(err);
        return done(err);
      }
      if (user) {
        console.log('already exists');
        return done(null, false, req.flash('message', 'user alredy exists'));
      }
      req.session.username = username;
      const newUser = new User({
        username,
        password,
        sessionID: req.sessionID,
      });
      newUser.save((error) => {
        if (error) {
          console.log(`couldn't save user: ${error}`);
          return done(error);
        }
        return done(null, newUser);
      });
    });
  }));
};
