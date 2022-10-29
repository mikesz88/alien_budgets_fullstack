const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Student = require('../models/Student');

const {
  getStudents,
  getStudent,
  getClassStudents,
  addGameById,
  deleteGameById,
} = require('../controllers/students');

const { protect, authorizedAdult } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorizedAdult, filteredResults(Student), getStudents);
router.route('/:id').get(protect, authorizedAdult, getStudent);
router.route('/class/:classid').get(protect, getClassStudents);
router.put('/game/:gameid', protect, addGameById);
router.delete('/game', protect, deleteGameById);

module.exports = router;
