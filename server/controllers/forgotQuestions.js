const ForgotQuestion = require('../models/ForgotQuestion');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all questions
// @route GET /api/v1/forgotquestions
// @access PUBLIC
exports.getAllForgotQuestions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

// @desc Get single question
// @route GET /api/v1/forgotquestions/:id
// @access PUBLIC
exports.getOneForgotQuestion = asyncHandler(async (req, res, next) => {
  const forgotQuestion = await ForgotQuestion.findById(req.params.id);

  if (!forgotQuestion) {
    return next(new ErrorResponse(`Id ${req.params.id} is not found in the list of questions.`))
  }

  res.status(200).json({ success: true, data: forgotQuestion });
});