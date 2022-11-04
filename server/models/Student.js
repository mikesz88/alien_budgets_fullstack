const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please add a name'],
  },
  lastInitial: {
    type: String,
    maxLength: 1,
    uppercase: true,
    required: [true, 'Please add a last Initial'],
  },
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 8,
  },
  avatarURL: {
    type: String,
    required: [true, 'Please add a link to the image'],
    match: [
      /^(https:\/\/alienbudgets\.s3\.amazonaws\.com\/).+(\.png)$/gm,
      'Please add a valid s3 url',
    ],
  },
  score: {
    type: Number,
    default: 0,
  },
  game: {
    type: mongoose.Schema.ObjectId,
    default: null,
  },
  previousGames: {
    type: [
      {
        job: String,
        dwelling: String,
        salary: Number,
        score: Number,
        averageMathFactScore: Number,
        averageBattleshipScore: Number,
      },
    ],
    required: [true, 'Please add all required data to record the game'],
    default: [],
  },
  avatarColor: {
    type: String,
    required: [true, 'Please add a background color to your avatar'],
    match: [/^(#)([A-Za-z0-9]{6}$)/gm, 'Please write a proper HEX code'],
  },
  classroomCode: {
    type: String,
    minLength: 6,
    maxLength: 6,
    required: [true, 'Please add a classroom code'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    default: 'student',
  },
  forgotPasswordQuestion: {
    type: String,
    required: [true, 'Please add a forgot password question'],
  },
  forgotPasswordAnswer: {
    type: String,
    required: [true, 'Please add an answer to the forgot password question'],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StudentSchema.pre('save', async function (next) {
  if (!this.isModified('forgotPasswordAnswer')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.forgotPasswordAnswer = await bcrypt.hash(
    this.forgotPasswordAnswer,
    salt
  );
});

// Sign JWT and return
StudentSchema.methods.getSignedJwt = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

StudentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

StudentSchema.methods.matchForgotAnswer = async function (enteredForgotAnswer) {
  return await bcrypt.compare(enteredForgotAnswer, this.forgotPasswordAnswer);
};

StudentSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpired = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('Student', StudentSchema);
