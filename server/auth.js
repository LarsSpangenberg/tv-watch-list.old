const express = require('express');

const app = express();
const router = new express.Router();

// functions to validate form data
function validateSignUpForm(payload) {
  const errors = {};
  let isValid = true;
  let message;

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isValid = false;
    errors.password = 'Password must have at least 8 characters';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isValid = false;
    errors.username = 'You gotta have a name... right?';
  }

  if (!isValid) {
    message = "You must've missed something. Try again!";
  }

  return {
    success: isValid,
    message,
    errors,
  };
}

function validateLoginForm(payload) {
  const errors = {};
  let isValid = true;
  let message;

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isValid = false;
    errors.password = 'No password detected. Beep Boop';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isValid = false;
    errors.username = 'You gotta have a name... right?';
  }

  if (!isValid) {
    message = "You must've missed something. Try again!";
  }

  return {
    success: isValid,
    message,
    errors,
  };
}

module.exports = router;
