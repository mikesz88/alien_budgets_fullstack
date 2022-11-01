/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../App';
import Card from '../../../components/Card';

const ResumeSavedGame = ({ changeView }) => {
  const { authService, gameService } = useContext(UserContext);
  const [currentGame, setCurrentGame] = useState(null);
  const BATTLESHIP_MONTHS = [4, 8, 12];

  useEffect(() => {
    gameService.getGameById(authService.game).then((res) => {
      setCurrentGame(res);
    });
  }, []);

  console.log(currentGame);
  const newGame = () => {
    authService.deleteGame();
    gameService.deleteGame(currentGame.gameId, authService.getBearerHeader());
    changeView('template');
  };

  const continueGame = () => {
    gameService.setGame(currentGame);
    if (BATTLESHIP_MONTHS.some((month) => month === currentGame.month)) {
      changeView('battleships');
    } else if (currentGame.month === 0) {
      changeView('template');
    } else {
      changeView('mathFacts');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '5rem',
      }}
    >
      <Card key="newGame" title="New Game" onClick={newGame} type="primary" />
      <Card
        key="continueSavedGame"
        title="Continue Saved Game"
        onClick={continueGame}
        type="primary"
      />
    </div>
  );
};

export default ResumeSavedGame;
