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
  updatePassword,
  updateForgotQuestionAnswer,
  deleteSelf,
  updateAvatar,
  deleteSelectedStudents,
} = require('../controllers/auth');

const { protect, authorizedAdult } = require('../middleware/auth');

const router = express.Router();

router.post('/register/adult', registerAdult);
router.post('/register/student', registerStudent);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getLoggedInUser);
router.post('/adult/forgotpassword', adultForgotPassword);
router.put(
  '/adult/updatedetails',
  protect,
  authorizedAdult,
  adultUpdateDetails
);
router.put('/student/updatedetails', protect, studentUpdateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/updateavatar', protect, updateAvatar);
router.post('/forgotpassword', forgotPassword);
router.put('/updateforgot', protect, updateForgotQuestionAnswer);
router.get('/forgotquestion/:user', forgotQuestion);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/deleteaccount', protect, deleteSelf);
router.put('/deletestudents', protect, deleteSelectedStudents);

module.exports = router;
