
const LocalStrategy = require('passport-local');
const User = require('../models/user');

module.exports = (passport) => {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    User.findOne(
      { username },
      (err, user) => {
        console.log(`User ${username} attempted to log in.`);
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'user not found' }); }

        return user.comparePassword(password, (error, isMatch) => {
          if (error) return done(error);
          if (!isMatch) {
            console.log('wrong password');
            return done(null, false, { message: "Password doesn't match" });
          }
          req.session.user = user;
          return done(null, user);
        });
      },
    );
  }));
};
