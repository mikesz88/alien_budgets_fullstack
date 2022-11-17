import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/PrimaryButton';
import Notification from '../../../components/Notification';
import { success, SUCCESS, error, ERROR } from '../../../common/constants';
import StyledBasicDiv from '../../../components/BasicDiv';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../services/ClassroomServiceProvider';
import { useGameServiceProvider } from '../../../services/GameServiceProvider';

const BudgetSummary = () => {
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
    getScore,
    deleteGame: deleteTheGame,
  } = useGameServiceProvider();
  const {
    user,
    addScore,
    getBearerHeader,
    addResultsToStudentsHistory,
    deleteGame: deleteSingleGame,
  } = useAuthServiceProvider();
  const navigate = useNavigate();
  const [total, setTotal] = useState(null);
  const monthlyBudgetScore = getMonth() * 1000;
  const mathFactScore = getMathFactResults().reduce(
    (a, z) => a + getMathFactScore(z),
    0
  );
  const battleshipScore = getBattleshipResults().reduce(
    (a, z) => a + z * 1000,
    0
  );
  const savingScore = getSavings() * 10;

  const updateTotal = () => setTotal(updateScoreFromSavings(getSavings()));

  const updateResults = () => {
    addScore(game.score + savingScore)
      .then(() => {
        updateStudentInClassroom(getBearerHeader(), {
          _id: user.id,
          score: game.score + savingScore,
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
      salary: getSalary() + savingScore,
      score: getScore(),
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
    deleteGame(); // Potential issue here that is causing table to show wrong data (test first before playing with this)
    // Another is edge case if the monthly budget cannot match if not enough to spend for essentials
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
