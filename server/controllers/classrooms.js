const Classroom = require('../models/Classroom');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all Classrooms
// @route GET /api/v1/classrooms
// @access PUBLIC
exports.getAllClassrooms = asyncHandler(async (req, res, next) => {
  const classrooms = await Classroom.find().select('classroomCode');
  if (!classrooms) {
    return next(new ErrorResponse(`There aren't any classrooms.`, 404));
  }
  res.status(200).json({ success: true, data: classrooms });
});

// @desc Get all Classes of specific adult
// @route GET /api/v1/classrooms/:adultId
// @access PRIVATE
exports.getAllClassroomsOfAdult = asyncHandler(async (req, res, next) => {
  const classrooms = await Classroom.find({ adult: req.params.adultid });

  if (!classrooms) {
    return next(
      new ErrorResponse(
        `Adult with id ${req.params.classid} does not have any classrooms`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: classrooms });
});

// @desc Get specific Class
// @route GET /api/v1/classrooms/single/:classId
// @access PRIVATE
exports.getSingleClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findOne({ _id: req.params.classid });

  if (!classroom) {
    return next(
      new ErrorResponse(`There is no class with id ${req.params.classid}`, 404)
    );
  }

  res.status(200).json({ success: true, data: classroom });
});
