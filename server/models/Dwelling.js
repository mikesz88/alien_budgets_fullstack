const mongoose = require('mongoose');

const DwellingSchema = new mongoose.Schema({
  dwelling: {
    type: String,
    unique: true,
    required: [true, 'Please add a house name'],
  },
  monthlyPayment: {
    type: Number,
    required: [true, 'Please add a monthly payment'],
  },
  dwellingUrl: {
    type: String,
    required: [true, 'Please add a link to the image'],
    unique: true,
    match: [
      /^(https:\/\/alienbudgets\.s3\.amazonaws\.com\/).+(\.jpg)$/gm,
      'Please add a valid s3 url',
    ],
  },
  maxOccupancy: {
    type: Number,
    required: [true, 'Please add a number for occupancy'],
  },
});

module.exports = mongoose.model('Dwelling', DwellingSchema);
