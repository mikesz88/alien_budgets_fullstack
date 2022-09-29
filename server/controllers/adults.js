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
  console.log('new Password =>', newPassword);
  student.password = newPassword;
  student.save();

  res
    .status(200)
    .json({
      success: true,
      data: `Your new password is ${newPassword}. You will not be able to retrieve once you exit.`,
    });
});
