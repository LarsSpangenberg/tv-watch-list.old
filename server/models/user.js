/* eslint-disable */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const ShowSchema = require('./show');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shows: [{ type: ShowSchema, sparse: true }],
  tags: [String],
  activeTags: [String],
  activeStatus: String,
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidate, cb) {
  bcrypt.compare(candidate, this.password, function(err, isMatch) {
    cb(null, isMatch);
  })
}

module.exports = mongoose.model('User', UserSchema, 'WL-Users');
