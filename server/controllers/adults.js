const Adult = require('../models/Adult');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get single adult by class
// @route GET /api/v1/adults/:classid
// @access PRIVATE
exports.getAdult = asyncHandler(async (req, res, next) => {
  const adult = await Adult
    .findOne({ "classrooms": { '$in': req.params.classid } })
    .select('lastName avatarURL avatarColor classrooms');

  if (!adult) {
    return next(new ErrorResponse(`No adult found with class id of ${req.params.classid}`, 404));
  }
  res.status(200).json({ success: true, data: adult });
});

// @desc Get all class codes
// @route GET /api/v1/adults/classcodelist
// @access PUBLIC
exports.getAllClassCodes = asyncHandler(async (req, res, next) => {
  const classCodes = await Adult.find().select('classrooms');
  const list = [];
  if (!classCodes) {
    return next(new ErrorResponse(`No class codes found.`, 404));
  }
  
  for (const classroom of classCodes) {
    list.push(...classroom.classrooms)
  }
  const uniqueClassCodes = Array.from(new Set(list))

  res.status(200).json({ success: true, data: uniqueClassCodes });
})