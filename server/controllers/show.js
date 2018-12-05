// const passport = require('passport');
// const { body, validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const Utils = require('../utils');
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
        const shows = {};
        user.shows.forEach((show) => {
          shows[show._id] = show;
        });

        return res.status(200).json({
          shows,
          sortShows: user.sortShows,
        });
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

    const {
      index,
      tags,
      status,
    } = req.body;
    const _id = new ObjectId();
    const newShowParams = { $each: [{ _id, tags, status }] };
    if (index) newShowParams.$position = index;

    return User.findOneAndUpdate(
      { username },
      { $push: { shows: newShowParams } },
      { new: true },
      (err, user) => {
        if (err) return next(err);

        const { order } = user.sortShows;
        const sortParams = { order };
        function createSortObj(addAtIndex, addToLast) {
          const indexArray = user.sortShows[addAtIndex];
          const lastArray = user.sortShows[addToLast];
          sortParams[addAtIndex] = [
            ...indexArray.slice(0, index),
            _id,
            ...indexArray.slice(index),
          ];
          sortParams[addToLast] = lastArray.concat(_id);
        }

        if (order === 'custom') {
          createSortObj('customOrder', 'lastOrder');
        } else {
          createSortObj('lastOrder', 'customOrder');
        }

        user.set({ sortShows: sortParams });

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

// ------------------- change sort order ----------------------------

exports.sortOrder = [
  ensureAuthenticated,
  (req, res, next) => {
    const { username } = req.session;
    const { order } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'no username found in session' });
    }


    return User.findOne(
      { username },
      (err, user) => {
        if (err) return next(err);

        let ids = [];
        const { ...sortShows } = user.sortShows;
        sortShows.order = order;
        if (order === 'custom') {
          sortShows.lastOrder = sortShows.customOrder;
          ids = sortShows.customOrder;
        } else {
          user.shows.sort(Utils.sortShows(order)).forEach((show) => {
            ids.push(show._id);
          });
          sortShows.lastOrder = ids;
        }
        user.set('sortShows', sortShows);

        return user.save((error) => {
          if (error) return next(error);
          return res.status(200).json({
            order,
            ids,
          });
        });
      },
    );
  },
];
