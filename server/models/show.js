/* eslint-disabl */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShowSchema = new Schema({
  title: { type: String, default: '' },
  currentSeason: { type: Number, default: 1 },
  currentEpisode: { type: Number, default: 1 },
  comments: { type: String, default: '' },
  dateAdded: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['current', 'completed', 'watch later', 'on hold', 'dropped'],
    default: 'current',
  },
  tags: [String],
});

module.exports = ShowSchema;
