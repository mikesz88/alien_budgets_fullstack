import { Spin } from 'antd';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../App';
import Card from '../../../components/Card';
import {
  battleships,
  BATTLESHIP_MONTHS,
  ERROR,
  error,
  mathFacts,
  SUCCESS,
  success,
  template,
} from '../../../common/constants';
import Notification from '../../../components/Notification';
import ResumeSavedGameWrapper from './styles';
import { useAuthServiceProvider } from '../../../providers/AuthServiceProvider';

const ResumeSavedGame = ({ changeView }) => {
  const { user, deleteGame, getBearerHeader } = useAuthServiceProvider();
  const { gameService } = useContext(UserContext);
  const [currentGame, setCurrentGame] = useState(null);
  const [loading, setLoading] = useState(false);

  const grabGameInfo = () => {
    gameService
      .getGameById(user.game)
      .then((res) => {
        setCurrentGame(res);
        Notification(success, SUCCESS, 'Saved Game Found');
      })
      .catch(() => Notification(error, ERROR, 'No saved game found'));
  };

  const newGame = () => {
    setLoading(true);
    deleteGame()
      .then(() => {
        gameService
          .deleteGame(currentGame._id, getBearerHeader())
          .then(() => changeView(template))
          .catch(() =>
            Notification(
              error,
              ERROR,
              'Game Service Connect Error. Please try again.'
            )
          );
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Authorization Service Connect Error. Please try again.'
        )
      )
      .finally(() => setLoading(false));
  };

  const continueGame = () => {
    gameService.setGame(currentGame);
    if (BATTLESHIP_MONTHS.some((month) => month === currentGame.month)) {
      changeView(battleships);
    } else if (currentGame.month === 0) {
      changeView(template);
    } else {
      changeView(mathFacts);
    }
  };

  useEffect(() => grabGameInfo(), []);

  return (
    <Spin spinning={loading}>
      <ResumeSavedGameWrapper>
        <Card key="newGame" title="New Game" onClick={newGame} type="primary" />
        <Card
          key="continueSavedGame"
          title="Continue Saved Game"
          onClick={continueGame}
          type="primary"
        />
      </ResumeSavedGameWrapper>
    </Spin>
  );
};

export default ResumeSavedGame;
