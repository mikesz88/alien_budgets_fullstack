import React, { useEffect } from 'react';
import Game from './Game/Game';
import Header from './Header';
import './css/style.css';
import { useGameServiceProvider } from '../../../services/GameServiceProvider';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';

const Battleship = ({ changeView }) => {
  const { getBearerHeader } = useAuthServiceProvider();
  const {
    game,
    updateGameById,
    getMonth,
    getSavings,
    getScore,
    getBonusOrFine,
  } = useGameServiceProvider();

  useEffect(() => {
    updateGameById(
      {
        month: getMonth(),
        savings: getSavings(),
        score: getScore(),
        bonusOrFine: getBonusOrFine(),
      },
      game.gameId,
      getBearerHeader()
    );
  }, []);

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <Header />
      <Game changeView={changeView} />
    </div>
  );
};

export default Battleship;
