//import modules
const mongoose = require('mongoose');

const moderatorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A article must have a title'],
    unique: true,
    trim: true,
    mminlength: [15, 'Please enter a valid title or full name of the title'],
  },
  author: {
    type: String,
    required: [true, 'A article must have at least one contributor'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'A article must have a published year'],
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  publisher_city: {
    type: String,
    trim: true,
  },
  volume: {
    type: Number,
    trim: true,
  },
  issue: {
    type: Number,
    trim: true,
  },
  journal: {
    type: String,
    trim: true,
  },
  pages: {
    type: String,
    trim: true,
  },
  doi: {
    type: String,
    trim: true,
  },
  detail: {
    type: String,
    required: [true, 'A article must have some detail'],
  },
  rejected: {
    type: Boolean,
    required: [
      true,
      'A statu of rejection is required'
    ],
    default: false,
  },
  rejectMessage: {
    type: String
  },
  status: {
    type: Boolean,
    required: [
      true,
      'An article which wait for mederating or analysing must have a status',
    ],
    default: false, //false = in moderation, true = in analysis
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const ModeratorAnalyst = mongoose.model('ModeratorAndAnalyst', moderatorSchema);

module.exports = ModeratorAnalyst;
