/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { Spin } from 'antd';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../App';
import Card from '../../../components/Card';
import {
  BATTLESHIP_MONTHS,
  ERROR,
  error,
  SUCCESS,
  success,
} from '../../../common/constants';
import Notification from '../../../components/Notification';

const ResumeSavedGame = ({ changeView }) => {
  const { authService, gameService, updateService } = useContext(UserContext);
  const [currentGame, setCurrentGame] = useState(null);
  const [loading, setLoading] = useState(false);

  const grabGameInfo = () => {
    gameService
      .getGameById(authService.game)
      .then((res) => {
        setCurrentGame(res);
        Notification(success, SUCCESS, 'Saved Game Found');
      })
      .catch(() => Notification(error, ERROR, 'No saved game found'));
  };

  useEffect(() => grabGameInfo(), []);

  const newGame = () => {
    setLoading(true);
    authService
      .deleteGame()
      .then(() => {
        gameService
          .deleteGame(currentGame._id, authService.getBearerHeader())
          .then(() => {
            updateService();
            changeView('template');
          });
      })
      .finally(() => setLoading(false));
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
    <Spin spinning={loading}>
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
    </Spin>
  );
};

export default ResumeSavedGame;
