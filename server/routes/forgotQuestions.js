const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const ForgotQuestion = require('../models/ForgotQuestion');

const { getAllForgotQuestions, getOneForgotQuestion } = require('../controllers/forgotQuestions');

router.route('/')
  .get(filteredResults(ForgotQuestion), getAllForgotQuestions);

router.route('/:id')
  .get(getOneForgotQuestion);

module.exports = router;