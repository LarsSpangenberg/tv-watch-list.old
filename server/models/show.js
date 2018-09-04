/* eslint-disabl */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShowSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  current: {
    Season: {
      type: Number,
      default: 1,
    },
    Episode: {
      type: String,
      default: 1,
    },
  },
  comments: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['current', 'completed', 'watch later', 'on hold'],
    default: 'current',
  },
  tags: [String],
  data: {},
});

module.exports = ShowSchema;
