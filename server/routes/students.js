const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Student = require('../models/Student');

const {
  getStudents,
  getStudent,
  getClassStudents,
  addGameById,
  deleteGame,
  addScoreToUser,
  addResultsToStudentsHistory,
} = require('../controllers/students');

const { protect, authorizedAdult } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorizedAdult, filteredResults(Student), getStudents);
router.route('/:id').get(protect, authorizedAdult, getStudent);
router.route('/class/:classid').get(protect, getClassStudents);
router.put('/game/:gameid', protect, addGameById);
router.delete('/game', protect, deleteGame);
router.put('/score', protect, addScoreToUser);
router.put('/addgameresults', protect, addResultsToStudentsHistory);

module.exports = router;
