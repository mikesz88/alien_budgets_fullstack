const Avatar = require('../models/Avatar');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { faker } = require('@faker-js/faker');


// @desc Get all avatars
// @route GET /api/v1/avatars
// @access PUBLIC
exports.getAvatars = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
})

// @desc Get random adjective
// @route GET /api/v1/avatars/adjective
// @access PUBLIC
exports.getAdjective = asyncHandler(async (req, res, next) => {

  res.status(200).json({ success: true, data: faker.word.adjective() });
})