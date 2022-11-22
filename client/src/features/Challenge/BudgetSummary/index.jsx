import React, { useEffect, useState } from 'react';
import Notification from '../../../components/Notification';
import {
  success,
  SUCCESS,
  error,
  ERROR,
  template,
} from '../../../common/constants';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../services/ClassroomServiceProvider';
import { useGameServiceProvider } from '../../../services/GameServiceProvider';
import { StyledButtonLargeWidth, StyledTable } from './styles';

const BudgetSummary = ({ changeView }) => {
  const { updateStudentInClassroom } = useClassroomServiceProvider();
  const {
    game,
    getMonth,
    getMathFactResults,
    getMathFactScore,
    getBattleshipResults,
    getSavings,
    updateScoreFromSavings,
    getJob,
    getHouse,
    getSalary,
    deleteGame: deleteTheGame,
  } = useGameServiceProvider();
  const {
    user,
    addScore,
    getBearerHeader,
    addResultsToStudentsHistory,
    deleteGame: deleteSingleGame,
  } = useAuthServiceProvider();
  const [total, setTotal] = useState(null);
  const [monthlyBudgetScore] = useState(getMonth() * 1000);
  const [mathFactScore] = useState(
    getMathFactResults().reduce((a, z) => a + getMathFactScore(z), 0)
  );
  const [battleshipScore] = useState(
    getBattleshipResults().reduce((a, z) => a + z * 1000, 0)
  );
  const [savingScore] = useState(getSavings() * 10);

  const updateTotal = () => setTotal(updateScoreFromSavings(getSavings()));

  const updateResults = () => {
    addScore(game.score + game.savings * 10)
      .then(() => {
        updateStudentInClassroom(getBearerHeader(), {
          _id: user.id,
          score: game.score + game.savings * 10,
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
      job: getJob().jobTitle,
      dwelling: getHouse().dwelling,
      salary: getSalary(),
      score: game.score + game.savings * 10,
      mathFactScore: +(
        getMathFactResults().reduce((a, z) => a + z, 0) /
        getMathFactResults().length
      ).toFixed(2),
      battleshipScore: +(
        getBattleshipResults().reduce((a, z) => a + z, 0) /
        getBattleshipResults().length
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
        deleteTheGame(game.gameId, getBearerHeader())
          .then(() =>
            Notification(
              success,
              SUCCESS,
              'Game officially has been reset. To play, press "Play Again"'
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
      <h1 style={{ textAlign: 'center' }}>Budget Summary</h1>
      <StyledTable
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
      <StyledButtonLargeWidth
        size="large"
        type="primary"
        onClick={() => changeView(template)}
      >
        Play Again
      </StyledButtonLargeWidth>
    </>
  );
};

export default BudgetSummary;
