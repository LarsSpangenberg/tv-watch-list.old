require('dotenv').config(); // eslint-disable-line

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const winston = require('winston');
const expressWinston = require('express-winston');

const auth = require('./auth/init');
const users = require('./routes/user');
const shows = require('./routes/show');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ------------------------ Request Logger -----------------------------
const loggerFormat = winston.format.printf(info => (
  `${info.level}: ${JSON.stringify(info.message, null, 4)}\n`
));

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
      format: loggerFormat,
    }),
  ],
}));

// -------------------------- db -------------------------------

mongoose.connect(process.env.DB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database error'));
db.once('connected', () => {
  console.log('Successfull database connection');
});
db.once('disconnected', () => {
  console.log('Successfully disconnected from the database');
});

// --------------- Authorization using passport ----------------

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 172800000,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
auth(passport);

// ----------------------- Routes -----------------------------

app.use('/api/auth', users);
app.use('/api/shows', shows);

// --------------------- Error Logger ------------------------

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
      format: loggerFormat,
    }),
  ],
}));

app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
// });
