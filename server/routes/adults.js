const express = require('express');
const router = express.Router();

const { getAdult, resetStudentPassword } = require('../controllers/adults');

const { protect, authorizedAdult } = require('../middleware/auth');

router.get('/class/:classid', protect, getAdult);

router.put('/:studentid', protect, authorizedAdult, resetStudentPassword);

module.exports = router;
