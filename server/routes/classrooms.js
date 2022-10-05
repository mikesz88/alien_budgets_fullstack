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
  deleteStudentFromClass,
  transferStudentToDifferentClassroom,
  deleteSingleClassroomByTeacher,
  createNewStudentInClassroom,
  deleteStudent,
  getClassroomFromStudent,
} = require('../controllers/classrooms');

const { protect, authorizedAdult } = require('../middleware/auth');

router.get('/', getAllClassrooms);
router.post('/', protect, authorizedAdult, createClassroom);
router.get('/:adultid', protect, getAllClassroomsOfAdult);
router.get('/single/:classid', protect, getSingleClassroom);
router.get('/student/:classroomcode', protect, getClassroomFromStudent);
router.put('/updateStudent', protect, updateStudentData);
router.put('/addstudent', addStudentToClassroom);
router.delete(
  '/deleteteacher/:adultid',
  protect,
  authorizedAdult,
  deleteAllClassroomsByTeacher
);
router.put('/delete/studentinclass', protect, deleteStudentFromClass);
router.put('/transferstudent', protect, transferStudentToDifferentClassroom);
router.delete(
  '/delete/:classroomid',
  protect,
  authorizedAdult,
  deleteSingleClassroomByTeacher
);
router.put(
  '/createstudent',
  protect,
  authorizedAdult,
  createNewStudentInClassroom
);
router.put('/delete/student', protect, authorizedAdult, deleteStudent);

module.exports = router;
