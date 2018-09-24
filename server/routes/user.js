const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.create);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/continue', userController.continue);

module.exports = router;
