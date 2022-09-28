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
  const classroom = await Classroom.find({ adult: req.params.adultid });

  if (!classroom) {
    return next(
      new ErrorResponse(
        `Adult with id ${req.params.classid} does not have any classrooms`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: classroom });
});

// @desc Get all classroom codes
// @route GET /api/v1/classrooms/
// @access PUBLIC
// exports.getAllClassCodes = asyncHandler(async (req, res, next) => {
//   const classCodes = await Adult.find().select('classrooms');
//   const list = [];
//   if (!classCodes) {
//     return next(new ErrorResponse(`No class codes found.`, 404));
//   }

//   for (const classroom of classCodes) {
//     list.push(...classroom.classrooms)
//   }
//   const uniqueClassCodes = Array.from(new Set(list))

//   res.status(200).json({ success: true, data: uniqueClassCodes });
// })
