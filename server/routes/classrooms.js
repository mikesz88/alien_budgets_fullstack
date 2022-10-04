const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Classroom = require('../models/Classroom');

const {
  getAllClassrooms,
  createClassroom,
  getAllClassroomsOfAdult,
  getSingleClassroom,
  updateStudentData,
  addStudentToClassroom,
  deleteAllClassroomsByTeacher,
  deleteSingleStudent,
} = require('../controllers/classrooms');

const { protect, authorizedAdult } = require('../middleware/auth');

router.get('/', getAllClassrooms);
router.post('/', protect, authorizedAdult, createClassroom);
router.get('/:adultid', protect, getAllClassroomsOfAdult);
router.get('/single/:classid', protect, getSingleClassroom);
router.put('/updateStudent', protect, updateStudentData);
router.put('/addstudent', addStudentToClassroom);
router.delete(
  '/deleteteacher/:adultid',
  protect,
  authorizedAdult,
  deleteAllClassroomsByTeacher
);
router.put('/deletestudent', protect, deleteSingleStudent);

module.exports = router;
