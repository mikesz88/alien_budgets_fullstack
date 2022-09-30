const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Classroom = require('../models/Classroom');

const {
  getAllClassrooms,
  getAllClassroomsOfAdult,
  getSingleClassroom,
  updateStudentData,
} = require('../controllers/classrooms');

const { protect, authorizedAdult } = require('../middleware/auth');

router.get('/', getAllClassrooms);
router.get('/:adultid', protect, getAllClassroomsOfAdult);
router.get('/single/:classid', protect, getSingleClassroom);
router.put('/updateStudent', protect, updateStudentData);

module.exports = router;
