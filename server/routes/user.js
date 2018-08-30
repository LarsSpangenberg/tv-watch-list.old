/* eslint-disable */
const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/user');

router.post('/signup', users_controller.create);

router.post('/login', users_controller.login);

router.get('/logout', users_controller.logout);

module.exports = router;
