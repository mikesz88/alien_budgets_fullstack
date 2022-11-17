const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Dwelling = require('../models/Dwelling.js');

const { getAllDwellings } = require('../controllers/dwellings');

router.get('/', filteredResults(Dwelling), getAllDwellings);

module.exports = router;
