const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const User = require('../models/user');

// sign up
exports.create = [
  body('username')
    .isLength({ min: 1 })
    .trim()
    .withMessage('You gotta have a name... right?'),
  body('password')
    .isLength({ min: 8 })
    .trim()
    .withMessage('Password needs to be at LEAST 8 characters.'),
  sanitizeBody('username').trim().escape(),
  sanitizeBody('password').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors,
      });
    }
    return next(null, res);
  },
  (req, res) => {
    passport.authenticate('signup', (err, user, info) => {
      if (info) {
        return res.status(400).json(info);
      }
      return res.status(200).json(user);
    })(req, res);
  },
];

// log in
exports.login = [
  body('username')
    .isLength({ min: 1 })
    .trim()
    .withMessage('You gotta have a name... right?'),
  body('password')
    .isLength({ min: 1 })
    .trim()
    .withMessage('No password detected. beep boop.'),
  sanitizeBody('username').trim().escape(),
  sanitizeBody('password').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors,
      });
    }
    return next(null, res);
  },
  (req, res) => {
    passport.authenticate('login', (err, user, info) => {
      if (info) {
        return res.status(400).json(info);
      }
      return res.status(200).json(user);
    })(req, res);
  },
];

// log out
exports.logout = (req, res) => {
  req.logout();
  res.end();
};

// persist session
exports.continue = (req, res) => {
  if (!req.session.user) return res.json({});
  console.log(req.session.user);
  return res.status(200).json({ user: req.session.user });
  // User.findOne({ sessionID: req.sessionID }, (err, user) => {
  //   if (err) return err;
  //   if (!user) {
  //     res.status(400).json('no session found');
  //   }
  //   return res.status(200).json(user);
  // });
};
