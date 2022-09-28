const Adult = require('../models/Adult');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

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
