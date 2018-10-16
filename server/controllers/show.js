// const passport = require('passport');
// const { body, validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// ---------- get the entire shows array ----------------------------

exports.getAllShows = [
  ensureAuthenticated,
  (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return res.status(400).json({ message: 'no username found in session' });
    }

    return User.findOne(
      { username },
      (err, user) => {
        if (err) return next(err);

        return res.status(200).json(user.shows);
      },
    );
  },
];

// ------------------ add a new show at index -------------------------

exports.create = [
  ensureAuthenticated,
  (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return res.status(400).json({ message: 'no username found in session' });
    }

    const { index, tags, status } = req.body;
    const _id = new ObjectId();
    const newShowParams = {
      $each: [{ _id, tags, status }],
    };
    if (index) newShowParams.$position = index;

    return User.findOneAndUpdate(
      { username },
      { $push: { shows: newShowParams } },
      { new: true },
      (err, user) => {
        if (err) return next(err);

        return user.save((error) => {
          if (error) return next(error);

          const newShow = user.shows.id(_id);
          return res.status(200).json(newShow);
        });
      },
    );
  },
];

// ------------------ update show ----------------------------------

exports.update = [
  ensureAuthenticated,
  (req, res, next) => {
    const { username } = req.session;
    const { id, ...showUpdate } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'no show id provided' });
    }

    const updateObj = {};
    Object.entries(showUpdate).forEach((entry) => {
      const [key, value] = entry;
      updateObj[`shows.$.${key}`] = value;
    });


    return User.findOneAndUpdate(
      { username, 'shows._id': id },
      { $set: updateObj },
      { new: true },
      (err, user) => {
        if (err) return next(err);

        return user.save((error) => {
          if (error) return next(error);

          const updatedShow = user.shows.id(id);
          return res.status(200).json(updatedShow);
        });
      },
    );
  },
];

// --------------------- remove show ---------------------------

exports.remove = [
  ensureAuthenticated,
  (req, res, next) => {
    const { username } = req.session;
    const { id } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'no username found in session' });
    }
    if (!id) {
      return res.status(400).json({ message: 'no subdoc id provided' });
    }

    return User.findOne(
      { username },
      (err, user) => {
        if (err) return next(err);
        user.shows.id(id).remove();

        return user.save((error) => {
          if (error) return next(error);
          return res.status(200).json({
            id,
            message: `show with id ${id} successfully removed`,
          });
        });
      },
    );
  },
];
