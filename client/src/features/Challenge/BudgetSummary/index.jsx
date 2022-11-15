import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';
import Notification from '../../../components/Notification';
import { success, SUCCESS, error, ERROR } from '../../../common/constants';
import StyledBasicDiv from '../../../components/BasicDiv';
import { useAuthServiceProvider } from '../../../providers/AuthServiceProvider';

const BudgetSummary = () => {
  const { gameService, classroomService } = useContext(UserContext);
  const {
    user,
    addScore,
    getBearerHeader,
    addResultsToStudentsHistory,
    deleteGame: deleteSingleGame,
  } = useAuthServiceProvider();
  const navigate = useNavigate();
  const [total, setTotal] = useState(null);
  const monthlyBudgetScore = gameService.getMonth() * 1000;
  const mathFactScore = gameService
    .getMathFactResults()
    .reduce((a, z) => a + gameService.getMathFactScore(z), 0);
  const battleshipScore = gameService
    .getBattleshipResults()
    .reduce((a, z) => a + z * 1000, 0);
  const savingScore = gameService.getSavings() * 10;

  const updateTotal = () =>
    setTotal(gameService.updateScoreFromSavings(gameService.getSavings()));

  const updateResults = () => {
    addScore(gameService.score)
      .then(() => {
        classroomService
          .updateStudentInClassroom(getBearerHeader(), {
            _id: user.id,
            score: user.score,
            firstName: user.firstName,
            lastInitial: user.lastInitial,
            username: user.username,
            avatarURL: user.avatarURL,
            avatarColor: user.avatarColor,
            classroomCode: user.classroomCode,
          })
          .then(() =>
            Notification(
              success,
              SUCCESS,
              'Student updated in Classroom Leaderboard.'
            )
          )
          .catch(() =>
            Notification(
              error,
              Error,
              'There was a connection error. Error 0. Please try again later.'
            )
          );
        Notification(success, SUCCESS, 'Student score finalized.');
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'There was a connection error. Error 1. Please try again later.'
        )
      );
  };

  const addResultToHistory = () => {
    addResultsToStudentsHistory({
      job: gameService.getJob().jobTitle,
      dwelling: gameService.getHouse().dwelling,
      salary: gameService.getSalary(),
      score: gameService.getScore(),
      mathFactScore: +(
        gameService.getMathFactResults().reduce((a, z) => a + z, 0) /
        gameService.getMathFactResults().length
      ).toFixed(2),
      battleshipScore: +(
        gameService.getBattleshipResults().reduce((a, z) => a + z, 0) /
        gameService.getBattleshipResults().length
      ).toFixed(2),
    })
      .then(() => {
        Notification(success, SUCCESS, 'Results added to your previous games.');
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'There was a connection error. Error 2. Please try again later.'
        )
      );
  };

  const deleteGame = () => {
    deleteSingleGame()
      .then(() =>
        gameService
          .deleteGame(gameService.gameId, getBearerHeader())
          .then(() =>
            Notification(
              success,
              SUCCESS,
              'Game officially has been reset. To play, press "Play Game"'
            )
          )
          .catch(() => Notification(error, ERROR, ''))
      )
      .catch(() =>
        Notification(
          error,
          ERROR,
          'There was a connection error. Error 3. Please try again later.'
        )
      );
  };

  useEffect(() => {
    updateTotal();
    updateResults();
    addResultToHistory();
    deleteGame();
  }, []);

  const dataSource = [
    {
      key: '1',
      Category: 'Monthly Budgets',
      Score: monthlyBudgetScore,
    },
    {
      key: '2',
      Category: 'Math Facts',
      Score: mathFactScore,
    },
    {
      key: '3',
      Category: 'Battleship',
      Score: battleshipScore,
    },
    {
      key: '4',
      Category: 'Saving (how much saved by the end * 10)',
      Score: savingScore,
    },
    {
      key: '5',
      Category: 'Total',
      Score: total,
    },
  ];

  const columns = [
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'Category',
      width: 50,
    },
    {
      title: 'Score',
      dataIndex: 'Score',
      key: 'Score',
      width: 50,
    },
  ];

  return (
    <>
      <StyledBasicDiv>Budget Summary</StyledBasicDiv>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      <StyledButton type="primary" onClick={() => navigate(`/challenge/play`)}>
        Play Again
      </StyledButton>
    </>
  );
};

export default BudgetSummary;
