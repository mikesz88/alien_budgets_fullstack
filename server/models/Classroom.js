const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  classroomCode: {
    type: String,
    unique: true,
    minLength: 6,
    maxLength: 6,
    required: [true, 'Please add a classroom code.'],
  },
  adult: {
    type: mongoose.Schema.ObjectId,
    ref: 'Adult',
    required: [true, 'Please add an adult.'],
  },
  gradeLevel: {
    type: String,
    required: [true, 'Please add a grade.'],
  },
  students: {
    type: [
      {
        id: mongoose.Schema.ObjectId,
        firstName: String,
        lastInitial: String,
        username: String,
        avatarURL: String,
        avatarColor: String,
        score: Number,
      },
    ],
    required: [true, 'Please add all required data to record the student'],
    default: [],
  },
  updatedOn: {
    type: Date || '',
  },
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
