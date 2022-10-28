const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  alienId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Student',
    required: [true, 'Please add a user Id'],
  },
  mathFactResults: {
    type: [Number],
    required: [true, 'Please add a math fact result.'],
    default: [],
  },
  battleshipResults: {
    type: [Number],
    required: [true, 'Please add a battleship result.'],
    default: [],
  },
  month: {
    type: Number,
    required: [true, 'Please add a month'],
  },
  job: {
    type: {
      _id: mongoose.Schema.ObjectId,
      jobTitle: String,
      hourlyAverage: Number,
      salaryAverage: Number,
    },
    required: [true, 'Please add a job'],
  },
  salary: {
    type: Number,
    required: [true, 'Please add a salary'],
  },
  liveInHousehold: {
    type: Number,
    required: [true, 'Please add how many house members'],
  },
  house: {
    type: {
      _id: mongoose.Schema.ObjectId,
      dwelling: String,
      monthlyPayment: Number,
      dwellingUrl: String,
      maxOccupancy: Number,
    },
    required: [true, 'Please add a house'],
  },
  utilitiesPercentage: {
    type: Number,
    required: [true, 'Please add a utility percentage'],
  },
  savings: {
    type: Number,
    required: [true, 'Please add a savings'],
    default: 0,
  },
  score: {
    type: Number,
    required: [true, 'Please add a score'],
    default: 0,
  },
  bonusOrFine: {
    type: Number,
    required: [true, 'Please add a bonus or fine'],
    default: 0,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedOn: {
    type: Date || '',
  },
});

module.exports = mongoose.model('Game', GameSchema);
