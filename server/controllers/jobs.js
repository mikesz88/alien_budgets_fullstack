const Job = require('../models/Job');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get one job
// @route GET /api/v1/job
// @access PUBLIC
exports.getRandomJob = asyncHandler(async (req, res, next) => {
  const jobCount = await Job.countDocuments();
  const randomNumber = Math.floor(Math.random() * jobCount);
  const job = await Job.findOne().skip(randomNumber);

  res.status(200).json({ success: true, data: job });
});
