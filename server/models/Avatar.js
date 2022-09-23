const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title']
  },
  avatarURL: {
    type: String,
    required: [true, 'Please add a link to the image'],
    unique: true,
    match: [
      /^(https:\/\/alienbudgets\.s3\.amazonaws\.com\/).+(\.png)$/gm,
      'Please add a valid s3 url'
    ]
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Avatar', AvatarSchema);