
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

exports.getAllTags = [
  ensureAuthenticated,
  (req, res, next) => {
    const { user: _id } = req.session.passport;

    return User.findById(
      { _id },
      (err, user) => {
        if (err) return next(err);

        return res.status(200).json(user.tags);
      },
    );
  },
];

exports.addTag = [
  ensureAuthenticated,
  (req, res, next) => {
    const { user: _id } = req.session.passport;
    const { tag } = req.body;
    const newTag = { _id: new ObjectId(), name: tag };

    return User.findByIdAndUpdate(
      { _id },
      {
        $push: {
          tags: {
            $each: [newTag],
            $sort: { name: 1 },
          },
        },
      },
      { new: true },
      (err, user) => {
        if (err) return next(err);

        return user.save((error) => {
          if (error) return next(error);

          const addedTag = user.tags.id(newTag._id);
          return res.status(200).json(addedTag);
        });
      },
    );
  },
];

exports.toggleActive = [
  ensureAuthenticated,
  (req, res, next) => {
    const { user: _id } = req.session.passport;
    const { id: tagId } = req.body;

    if (!tagId) {
      return res.status(400).json({ message: 'no tag id provided' });
    }

    return User.findById(
      { _id },
      (err, user) => {
        if (err) return next(err);
        const tag = user.tags.id(tagId);
        tag.active = !tag.active;

        return user.save((error) => {
          if (error) return next(error);

          return res.status(200).json(tag);
        });
      },
    );
  },
];

exports.removeTag = [
  ensureAuthenticated,
  (req, res, next) => {
    const { user: _id } = req.session.passport;
    const { id: tagId } = req.body;

    if (!tagId) {
      return res.status(400).json({ message: 'no tag id provided' });
    }

    return User.findById(
      { _id },
      (err, user) => {
        if (err) return next(err);

        const updatedShows = [];
        const tag = user.tags.id(tagId);
        const { name } = tag;
        user.set({
          shows: user.shows.map((show) => {
            const { tags } = show;
            const index = tags.indexOf(name);
            if (index !== -1) {
              tags.splice(index, 1);
              updatedShows.push(show);
            }
            return show;
          }),
        });
        tag.remove();

        return user.save((error) => {
          if (error) return next(error);

          return res.status(200).json({
            tagId,
            updatedShows,
            message: `tag with id ${tagId} successfully removed`,
          });
        });
      },
    );
  },
];
