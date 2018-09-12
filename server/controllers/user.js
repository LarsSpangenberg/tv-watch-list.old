const passport = require('passport');
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
      console.log('sending response');
      console.log(user);
      const { username, shows, tags } = user;
      return res.status(200).json({ username, shows, tags });
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
        errors: errors.array(),
      });
    }
    return next(null, res);
  },
  (req, res) => {
    passport.authenticate('login', (err, user, info) => {
      if (info) {
        return res.status(400).json(info);
      }
      const { username, shows, tags } = user;
      return res.status(200).json({ username, shows, tags });
    })(req, res);
  },
];

// log out
exports.logout = (req, res) => {
  delete req.session.user;
  req.logout();
  return res.status(204).end();
};

// persist session
exports.continue = (req, res) => {
  if (!req.session.user) return res.status(204).end();

  const { username, shows, tags } = req.session.user;
  return res.status(200).json({ username, shows, tags });
};
