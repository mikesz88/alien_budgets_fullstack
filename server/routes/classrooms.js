const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Classroom = require('../models/Classroom');

const {
  getAllClassrooms,
  getAllClassroomsOfAdult,
  getSingleClassroom,
} = require('../controllers/classrooms');

const { protect, authorizedAdult } = require('../middleware/auth');

router.get('/', getAllClassrooms);
router.get('/:adultid', protect, getAllClassroomsOfAdult);
router.get('/single/:classid', protect, getSingleClassroom);

module.exports = router;
