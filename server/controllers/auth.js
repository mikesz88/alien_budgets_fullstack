const Adult = require('../models/Adult');
const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc Register Adult
// @route POST /api/v1/auth/register/adult
// @access PUBLIC
exports.registerAdult = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    avatarURL,
    avatarColor,
    gradeLevel,
    forgotPasswordQuestion,
    forgotPasswordAnswer,
  } = req.body;

  const user = await Adult.create({
    firstName,
    lastName,
    email,
    password,
    avatarURL,
    avatarColor,
    gradeLevel,
    forgotPasswordQuestion,
    forgotPasswordAnswer,
  });

  sendTokenResponse(user, 200, res);
});

// @desc Register Student
// @route POST /api/v1/auth/register/student
// @access PUBLIC
exports.registerStudent = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastInitial,
    username,
    password,
    avatarURL,
    avatarColor,
    classroomCode,
    forgotPasswordQuestion,
    forgotPasswordAnswer,
  } = req.body;

  const user = await Student.create({
    firstName,
    lastInitial,
    username,
    password,
    avatarURL,
    avatarColor,
    classroomCode,
    forgotPasswordQuestion,
    forgotPasswordAnswer,
  });

  sendTokenResponse(user, 200, res);
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access PUBLIC
exports.login = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!password) {
    return next(new ErrorResponse('Please provide a password', 401));
  }

  if (!email && !username) {
    return next(
      new ErrorResponse('Please provide a username or password', 401)
    );
  }

  const user = email
    ? await Adult.findOne({ email: email.toLowerCase() }).select('+password')
    : await Student.findOne({ username: username.toLowerCase() }).select(
        '+password'
      );

  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc Logout User
// @route GET /api/v1/auth/logout
// @access PUBLIC
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 1 + 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'You are officially logged out.',
  });
});

// @desc Get logged in User
// @route GET /api/v1/auth/me
// @access PRIVATE
exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
  const user = req.adult
    ? await Adult.findById(req.adult.id)
    : await Student.findById(req.student.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Adult Forgot Password
// @route POST /api/v1/auth/adult/forgotpassword
// @access PUBLIC
exports.adultForgotPassword = asyncHandler(async (req, res, next) => {
  const user = await Adult.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: true });

  // const resetUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/auth/resetpassword/${resetToken}`;
  const resetUrl = `${req.protocol}://localhost:3000/forgotpassword/resetbyemail/${resetToken}`;

  const message = `
  You are receiving this email because you (or someone else) has requested a password reset.
  Please click this link: ${resetUrl} and follow the directions to reset your password.
  `;

  const options = {
    email: user.email,
    subject: 'Password Reset',
    message,
  };

  try {
    await sendEmail(options);
    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (error) {
    throw error;

    user.getResetPasswordToken = undefined;
    user.getResetPasswordExpired = undefined;

    await user.save({ validateBeforeSave: false });
  }
});

// @desc Forgot Question
// @route GET /api/v1/auth/forgotquestion/:user
// @access PUBLIC
exports.forgotQuestion = asyncHandler(async (req, res, next) => {
  const user = (await Adult.findOne({ email: req.params.user }))
    ? await Adult.findOne({ email: req.params.user })
    : await Student.findOne({ username: req.params.user });

  if (!user) {
    return next(
      new ErrorResponse('There is no user with that email/username', 401)
    );
  }

  res.status(200).json({
    success: true,
    data: user.forgotPasswordQuestion,
  });
});

// @desc Forgot Password
// @route POST /api/v1/auth/forgotpassword
// @access PUBLIC
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = (await Adult.findOne({ email: req.body.email }).select(
    '+forgotPasswordAnswer'
  ))
    ? await Adult.findOne({ email: req.body.email }).select(
        '+forgotPasswordAnswer'
      )
    : await Student.findOne({ username: req.body.username }).select(
        '+forgotPasswordAnswer'
      );

  if (!user) {
    return next(
      new ErrorResponse('There is no user with that email or username', 404)
    );
  }

  // compare forgotten Password Answer with user Forgotten Answer in account
  const isMatch = await user.matchForgotAnswer(req.body.forgotPasswordAnswer);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: resetToken,
  });
});

// @desc Update Forgot Question & Answer
// @route PUT /api/v1/auth/updateforgot
// @access PRIVATE
exports.updateForgotQuestionAnswer = asyncHandler(async (req, res, next) => {
  // const user = await User.findById(req.user.id).select('+forgotPasswordAnswer');
  const user = req.adult
    ? await Adult.findById(req.adult.id).select('+forgotPasswordAnswer')
    : await Student.findById(req.student.id).select('+forgotPasswordAnswer');
  if (!(await user.matchForgotAnswer(req.body.currentForgotAnswer))) {
    return next(new ErrorResponse('Your answer is incorrect', 401));
  }

  user.forgotPasswordQuestion = req.body.newForgotPasswordQuestion;
  user.forgotPasswordAnswer = req.body.newForgotPasswordAnswer;
  await user.save();

  res.status(200).json({
    success: true,
    forgotQuestion: user.forgotPasswordQuestion,
  });
});

// @desc Reset Password
// @route PUT /api/v1/auth/resetpassword/:resettoken
// @access PUBLIC
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = (await Adult.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now() },
  }))
    ? await Adult.findOne({
        resetPasswordToken,
        resetPasswordExpired: { $gt: Date.now() },
      })
    : await Student.findOne({
        resetPasswordToken,
        resetPasswordExpired: { $gt: Date.now() },
      });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;
  user.save();

  sendTokenResponse(user, 200, res);
});

// @desc Update Adult Details
// @route PUT /api/v1/auth/adult/updatedetails
// @access PRIVATE
exports.adultUpdateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    // avatarURL: req.body.avatarURL,
    // avatarColor: req.body.avatarColor,
    gradeLevel: req.body.gradeLevel,
    classrooms: req.body.classrooms,
  };

  const user = await Adult.findByIdAndUpdate(req.adult.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update Student Details
// @route PUT /api/v1/auth/student/updatedetails
// @access PRIVATE
exports.studentUpdateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastInitial: req.body.lastInitial,
    // username: req.body.username,
    // avatarURL: req.body.avatarURL,
    // avatarColor: req.body.avatarColor,
    classroomCode: req.body.classroomCode,
  };

  const user = await Student.findByIdAndUpdate(req.student.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update Avatar (and Username if student)
// @route PUT /api/v1/auth/updateavatar
// @access PRIVATE
exports.updateAvatar = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    avatarURL: req.body.avatarURL,
    avatarColor: req.body.avatarColor,
    username: req.body.username,
  };

  const user = req.adult
    ? await Adult.findByIdAndUpdate(req.adult.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
      })
    : await Student.findByIdAndUpdate(req.student.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
      });
  if (!user) {
    return next(new ErrorResponse('Unable to find User'), 401);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update User Password
// @route PUT /api/v1/auth/updatepassword
// @access PRIVATE
exports.updatePassword = asyncHandler(async (req, res, next) => {
  let user;

  if (req.adult) {
    user = await Adult.findById(req.adult.id).select('+password');
  } else {
    user = await Student.findById(req.student.id).select('+password');
  }

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc Delete my own account
// @route PUT /api/v1/auth/deleteaccount
// @access PRIVATE
exports.deleteSelf = asyncHandler(async (req, res, next) => {
  const user = req.adult
    ? await Adult.findByIdAndDelete(req.adult.id)
    : await Student.findByIdAndDelete(req.student.id);

  if (!user) {
    return next(new ErrorResponse('Unable to find User'), 401);
  }

  res.status(200).json({
    success: true,
    data: {},
    message: 'The user has been deleted',
  });
});

// @desc Delete my own account
// @route delete /api/v1/auth/deletestudents
// @access PRIVATE
exports.deleteSelectedStudents = asyncHandler(async (req, res, next) => {
  const results = await Student.deleteMany({
    _id: { $in: req.body },
  });

  if (!results) {
    return next(new ErrorResponse("Unable to students with given id's"), 401);
  }

  res.status(200).json({ success: true, results });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwt();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token, user });
};
