const Adult = require('../models/Adult');
const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { faker } = require('@faker-js/faker');

// @desc Get single adult by class
// @route GET /api/v1/adults/:classid
// @access PRIVATE
exports.getAdult = asyncHandler(async (req, res, next) => {
  const adult = await Adult.findOne({
    classrooms: { $in: req.params.classid },
  }).select('lastName avatarURL avatarColor classrooms');

  if (!adult) {
    return next(
      new ErrorResponse(
        `No adult found with class id of ${req.params.classid}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: adult });
});

// @desc Reset Students password
// @route GET /api/v1/adults/:studentid
// @access PRIVATE
exports.resetStudentPassword = asyncHandler(async (req, res, next) => {
  const student = await Student.findOne({ _id: req.params.studentid });

  if (!student) {
    return next(
      new ErrorResponse(`No Student with id ${req.params.studentid}`, 404)
    );
  }

  const newPassword = faker.internet.password(
    8,
    false,
    /[a-zA-Z0-9-#$^+_!*()@%&]/
  );
  student.password = newPassword;
  student.save();

  res.status(200).json({
    success: true,
    data: {
      firstName: student.firstName,
      lastInitial: student.lastInitial,
      username: student.username,
      newPassword,
      message: `You will not be able to retrieve it once you close the modal.`,
    },
  });
});

// @desc Reset Students password
// @route GET /api/v1/adults/updatestudent/:studentid
// @access PRIVATE
exports.updateStudentByAdult = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastInitial: req.body.lastInitial,
    username: req.body.username,
    avatarURL: req.body.avatarURL,
    avatarColor: req.body.avatarColor,
  };

  const student = await Student.findByIdAndUpdate(
    req.params.studentid,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!student) {
    return next(
      new ErrorResponse(`No Student with id ${req.params.studentid}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

// @desc Validate Email Address
// @route GET /api/v1/adults/validateemail/:email
// @access PUBLIC
exports.validateEmail = asyncHandler(async (req, res, next) => {
  const adult = await Adult.find({ email: req.params.email });

  if (adult.length) {
    return next(
      new ErrorResponse(
        `There is already an account with ${req.params.email} email. Please login with that email or sign up with a different email.`,
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    data: { email: req.params.email, message: 'There are no matched emails' },
  });
});
