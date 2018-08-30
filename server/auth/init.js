/* eslint-disable */
require('dotenv').config();

const ObjectID = require('mongoose').Types.ObjectId;
const User = require('../models/user');
const login = require('./login');
const signup = require('./signup');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById((new ObjectID(id)), (err, doc) => {
      if(err) {
        console.error(`error accessing records of user with id: ${id}`);
        return console.log(err.message);
      }
      done(null, doc);
    });
  });

  // Strategies
  login(passport);
  signup(passport);
};
