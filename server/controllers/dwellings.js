const Dwelling = require('../models/Dwelling');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all dwellings
// @route GET /api/v1/dwelling
// @access PUBLIC
exports.getAllDwellings = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});
