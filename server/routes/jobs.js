const express = require('express');
const router = express.Router();

const { getRandomJob } = require('../controllers/jobs');

router.get('/', getRandomJob);

module.exports = router;
