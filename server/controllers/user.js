/* eslint-disabl */
const passport = require('passport');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
      console.log(errors);
      return res.status(400).json({
        success: false,
        message: 'something went wrong :/',
        errors,
      });
    }
    return next(null, res);
  },
  passport.authenticate('signup', { failureFlash: true }),
  (req, res) => res.status(200).json(req.body),
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
    console.log('validating');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        message: "Must've missed somethin' :/",
        errors,
      });
    }
    return next(null, res);
  },
  passport.authenticate('login', { failureFlash: true }),
  (req, res) => res.status(200).json(req.body),
];

// log out
exports.logout = (req, res) => {
  console.log('logging out');
  req.logout();
  res.end();
};
