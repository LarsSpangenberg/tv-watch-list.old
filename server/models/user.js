const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const ShowSchema = require('./show');
const TagSchema = require('./tag');

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  shows: { type: [ShowSchema], default: [ShowSchema] },
  tags: [TagSchema],
  status: String,
});

UserSchema.pre('save', function(next) { // eslint-disable-line
  const user = this;

  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(12, (err, salt) => {
    if (err) return next(err);
    return bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidate, next) { // eslint-disable-line
  bcrypt.compare(candidate, this.password, (err, isMatch) => {
    next(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema, 'WL-Users');
