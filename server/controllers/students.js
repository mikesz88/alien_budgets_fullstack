const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all students
// @route GET /api/v1/students
// @access PRIVATE & Authorized
exports.getStudents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

// @desc Get single student
// @route GET /api/v1/students/:id
// @access PRIVATE & Authorized
exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: student });
});

// @desc Get students in class (leaderboard)
// @route GET /api/v1/students/class/:classId
// @access PRIVATE
exports.getClassStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find({
    classroomCode: req.params.classid,
  }).select('username avatarURL avatarColor classroomCode');
  if (!students) {
    return next(
      new ErrorResponse(
        `No class or students found with class id of ${req.params.classid}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: students });
});

// @desc Add game by id
// @route PUT /api/v1/students/game/:gameid
// @access PRIVATE
exports.addGameById = asyncHandler(async (req, res, next) => {
  const game = { game: req.params.gameid };

  const student = await Student.findByIdAndUpdate(req.student.id, game, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return next(
      new ErrorResponse(
        `No student found with game id of ${req.student.gameid}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

// @desc Delete game by id
// @route DELETE /api/v1/students/game
// @access PRIVATE
exports.deleteGameById = asyncHandler(async (req, res, next) => {
  const game = { game: '' };

  const student = await Student.findByIdAndUpdate(req.student.id, game, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return next(
      new ErrorResponse(
        `No student found with game id of ${req.student.gameid}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});
