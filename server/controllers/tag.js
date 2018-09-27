
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

exports.getAllTags = [
  ensureAuthenticated,
  (req, res, next) => {
    const { user: userId } = req.session.passport;

    return User.findById(
      { userId },
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
    const { user: userId } = req.session.passport;
    const { tag } = req.body;
    const newTag = { _id: new ObjectId(), name: tag };

    return User.findByIdAndUpdate(
      { userId },
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
    const { user: userId } = req.session.passport;
    const { id, isActive } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'no tag id provided' });
    }

    return User.findOneAndUpdate(
      { '_id': userId, 'tags._id': id },
      { $set: { 'tags.$.active': isActive } },
      { new: true },
      (err, user) => {
        if (err) return next(err);

        return user.save((error) => {
          if (error) return next(error);

          const updatedShow = user.tags.id(id);
          return res.status(200).json(updatedShow);
        });
      },
    );
  },
];

exports.removeTag = [
  ensureAuthenticated,
  (req, res, next) => {
    const { user: userId } = req.session.passport;
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'no tag id provided' });
    }

    return User.findById(
      { userId },
      (err, user) => {
        if (err) return next(err);
        user.tags.id(id).remove();

        return user.save((error) => {
          if (error) return next(error);

          return res.status(200).json({
            id,
            message: `tag with id ${id} successfully removed`,
          });
        });
      },
    );
  },
];
