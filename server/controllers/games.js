const Game = require('../models/Game');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get Game by ID
// @route GET /api/v1/games/:gameid
// @access PRIVATE
exports.getGameById = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.gameid);

  if (!game) {
    return next(
      new ErrorResponse(`There is no game with ${req.params.gameid}`, 404)
    );
  }

  res.status(200).json({ success: true, data: game });
});

// @desc Create new game
// @route POST /api/v1/games
// @access PRIVATE
exports.createNewGame = asyncHandler(async (req, res, next) => {
  const {
    alienId,
    mathFactResults,
    battleshipResults,
    month,
    job,
    salary,
    liveInHousehold,
    house,
    utilitiesPercentage,
    savings,
    score,
    bonusOrFine,
  } = req.body;

  const game = await Game.create({
    alienId,
    mathFactResults,
    battleshipResults,
    month,
    job,
    salary,
    liveInHousehold,
    house,
    utilitiesPercentage,
    savings,
    score,
    bonusOrFine,
  });

  res.status(200).json({ success: true, data: game });
});

// @desc Update Game by ID
// @route PUT /api/v1/games/:gameid
// @access PRIVATE
exports.updateGameById = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    alienId: req.body.alienId,
    mathFactResults: req.body.mathFactResults,
    battleshipResults: req.body.battleshipResults,
    month: req.body.month,
    job: req.body.job,
    salary: req.body.salary,
    liveInHousehold: req.body.liveInHousehold,
    house: req.body.house,
    utilitiesPercentage: req.body.utilitiesPercentage,
    savings: req.body.savings,
    score: req.body.score,
    bonusOrFine: req.body.bonusOrFine,
    updatedOn: Date.now(),
  };

  const game = await Game.findByIdAndUpdate(req.params.gameid, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!game) {
    return next(
      new ErrorResponse(`There is no game with ${req.params.gameid}`, 404)
    );
  }

  res.status(200).json({ success: true, data: game });
});

// @desc DELETE Game by ID
// @route DELETE /api/v1/games/:gameid
// @access PRIVATE
exports.deleteGameById = asyncHandler(async (req, res, next) => {
  const game = await Game.findByIdAndDelete(req.params.gameid);

  if (!game) {
    return next(
      new ErrorResponse(`There is no game with ${req.params.gameid}`, 404)
    );
  }

  res
    .status(200)
    .json({ success: true, data: {}, message: 'The game has been deleted.' });
});
