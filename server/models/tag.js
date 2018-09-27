/* eslint-disabl */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagSchema = new Schema({
  name: { type: String, required: true },
  active: { type: Boolean, default: false },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = TagSchema;
