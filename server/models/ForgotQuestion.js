const mongoose = require('mongoose');

const ForgotQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please add a question']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ForgotQuestion', ForgotQuestionSchema);