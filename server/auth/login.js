
const LocalStrategy = require('passport-local');
const User = require('../models/user');

module.exports = (passport) => {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    User.findOneAndUpdate(
      { username },
      { sessionID: req.sessionID },
      (err, user) => {
        console.log(`User ${username} attempted to log in.`);
        if (err) { return done(err); }
        if (!user) { return done(null, false, req.flash('message', 'user not found')); }

        return user.comparePassword(password, (error, isMatch) => {
          if (error) return done(error);
          if (!isMatch) {
            return done(null, false, req.flash('message', "Password doesn't match"));
          }
          req.session.username = username;
          return done(null, user);
        });
      },
    );
  }));
};
