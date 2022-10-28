const express = require('express');
const router = express.Router();

const {
  getGameById,
  createNewGame,
  updateGameById,
  deleteGameById,
} = require('../controllers/games');

const { protect } = require('../middleware/auth');

router.get('/:gameid', protect, getGameById);
router.post('/', protect, createNewGame);
router.put('/:gameid', protect, updateGameById);
router.delete('/:gameid', protect, deleteGameById);

module.exports = router;
