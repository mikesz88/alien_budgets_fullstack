const express = require('express');
const router = express.Router();

const {
  getAdult,
  getAllClassCodes
} = require('../controllers/adults');

const { protect } = require('../middleware/auth');


router.route('/class/:classid')
  .get(protect, getAdult);

router.route('/classcodelist')
  .get(getAllClassCodes);

module.exports = router;