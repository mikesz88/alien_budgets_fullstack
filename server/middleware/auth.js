const Adult = require('../models/Adult');
const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');

exports.protect = asyncHandler(async(req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  } 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adult = await Adult.findById(decoded.id);

    if (!req.adult) {
      req.student = await Student.findById(decoded.id);
    }

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

exports.authorizedAdult = () => {
  return (req, res, next) => {
    if (!req.adult) {
      return next(
        new ErrorResponse(
          `Students are not authorized to access this route`, 
          403
        ))
    }
    next();
  }
}