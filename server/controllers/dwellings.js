const Dwelling = require('../models/Dwelling');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all dwellings
// @route GET /api/v1/dwelling
// @access PUBLIC
exports.getAllDwellings = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

// @desc Get specific dwellings
// @route GET /api/v1/dwelling/:id
// @access PUBLIC
exports.getSpecificDwelling = asyncHandler(async (req, res, next) => {
  const dwelling = await Dwelling.findById(req.params.id);

  if (!dwelling) {
    return next(
      new ErrorResponse(`There is no dwelling with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: dwelling });
});
