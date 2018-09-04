const passport = require('passport');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const Show = require('../models/show');

exports.create = [];
