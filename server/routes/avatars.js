const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Avatar = require('../models/Avatar');

const { getAvatars, getAdjective } = require('../controllers/avatars');

router.route('/')
  .get(filteredResults(Avatar), getAvatars);

router.route('/adjective')
  .get(getAdjective);

  module.exports = router;