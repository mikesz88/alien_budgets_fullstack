const express = require('express');

const { 
  registerAdult, 
  registerStudent,
  login,
  logout,
  getLoggedInUser,
  adultForgotPassword,
  resetPassword,
  forgotPassword,
  forgotQuestion,
  adultUpdateDetails,
  studentUpdateDetails,
  updatePassword
} = require('../controllers/auth');

const { protect, authorizedAdult } = require('../middleware/auth');

const router = express.Router();

router.post('/register/adult', registerAdult);
router.post('/register/student', registerStudent);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getLoggedInUser);
router.post('/adult/forgotpassword', adultForgotPassword);
router.put('/adult/updatedetails', protect, authorizedAdult(), adultUpdateDetails);
router.put('/student/updatedetails', protect, studentUpdateDetails);
router.post('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.get('/forgotquestion/:user', forgotQuestion);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;