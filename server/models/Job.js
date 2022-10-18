const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    unique: true,
    required: [true, 'Please add a job title'],
  },
  hourlyAverage: {
    type: Number,
    required: [true, 'Please add an hourly average'],
  },
  salaryAverage: {
    type: Number,
    required: [true, 'Please add a salary average'],
  },
});

module.exports = mongoose.model('Job', JobSchema);
