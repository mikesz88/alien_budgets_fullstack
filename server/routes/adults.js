const express = require('express');
const router = express.Router();

const { getAdult } = require('../controllers/adults');

const { protect } = require('../middleware/auth');

router.route('/class/:classid').get(protect, getAdult);

module.exports = router;
