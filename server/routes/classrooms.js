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
} = require('../controllers/classrooms');

const { protect, authorizedAdult } = require('../middleware/auth');

router.get('/', getAllClassrooms);
router.post('/', protect, authorizedAdult, createClassroom);
router.get('/:adultid', protect, getAllClassroomsOfAdult);
router.get('/single/:classid', protect, getSingleClassroom);
router.put('/updateStudent', protect, updateStudentData);
router.put('/addstudent', addStudentToClassroom);

/* Add this addstudent function to the register student page 2 */

module.exports = router;
