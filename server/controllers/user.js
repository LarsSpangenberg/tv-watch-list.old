const passport = require('passport');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const User = require('../models/user');

// ----------------- sign up ------------------------------

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
    console.log('validating');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }
    return next(null, res);
  },
  (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) return next(err);
      if (info) {
        return res.status(400).json(info);
      }
      return req.logIn(user, (error) => {
        if (error) return next(error);
        console.log('sending response');
        const { username } = user;
        return res.status(200).json({ username });
      });
    })(req, res, next);
  },
];

// ------------------------ log in -----------------------

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
        errors: errors.array(),
      });
    }
    return next(null, res);
  },
  (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (info) {
        return res.status(400).json(info);
      }
      return req.logIn(user, (error) => {
        if (error) return next(error);
        const { username } = user;
        return res.status(200).json({ username });
      });
    })(req, res, next);
  },
];

// ----------------- log out ---------------------

exports.logout = (req, res) => {
  delete req.session.username;
  req.logout();
  return res.status(204).end();
};

// ----------------- persist session -----------------------

exports.continue = (req, res) => {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.status(204).end();

  const { username } = req.session;
  console.log(req.session);
  return res.status(200).json({ username });
};
