import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  withMoneySymbol,
  success,
  SUCCESS,
  error,
  ERROR,
} from '../../../../common/constants';
import StyledButton from '../../../../components/PrimaryButton';
import { useAuthServiceProvider } from '../../../../services/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../../services/ClassroomServiceProvider';
import { useGameServiceProvider } from '../../../../services/GameServiceProvider';
import {
  StyledBudgetInfo,
  StyledDivMarginBottom,
  StyledFailedBudgetContainer,
  StyledH1CenteredAndBottom,
} from './style';
import Notification from '../../../../components/Notification';

const FailedBudget = () => {
  const navigate = useNavigate();
  const { updateStudentInClassroom } = useClassroomServiceProvider();
  const {
    user,
    addScore,
    getBearerHeader,
    addResultsToStudentsHistory,
    deleteGame: deleteSingleGame,
  } = useAuthServiceProvider();
  const {
    game,
    getSalary,
    getSavings,
    getBonusOrFine,
    getHouse,
    getUtilities,
    getHouseMembers,
    getJob,
    getMathFactResults,
    getBattleshipResults,
    deleteGame: deleteTheGame,
  } = useGameServiceProvider();

  const [preTaxMonthlySalary] = useState(
    () => +(getSalary() / 12 + getSavings() + getBonusOrFine()).toFixed(2),
    []
  );
  const [monthlySalaryTax] = useState(
    () => +(preTaxMonthlySalary * 0.1).toFixed(2),
    []
  );

  const [postTaxMonthlyIncome] = useState(
    +(preTaxMonthlySalary - monthlySalaryTax).toFixed(2)
  );
  const [mortgage] = useState(getHouse().monthlyPayment);
  const [utilities] = useState(
    +(getUtilities() * getHouse().monthlyPayment).toFixed(2)
  );
  const [groceries] = useState(+((getHouseMembers() + 1) * 50).toFixed(2));

  /* testing area */
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
    updateResults();
    addResultToHistory();
    deleteGame();
  }, []);

  return (
    <StyledFailedBudgetContainer>
      <StyledH1CenteredAndBottom>
        Your monthly salary after taxes does not cover the essentials (mortgage,
        utilities, and groceries) for the month
      </StyledH1CenteredAndBottom>
      <StyledBudgetInfo>
        <StyledDivMarginBottom>
          Monthly Income after taxes:{' '}
          {withMoneySymbol(postTaxMonthlyIncome + 1)}
        </StyledDivMarginBottom>
        <StyledDivMarginBottom>
          Money needed:{' '}
          {withMoneySymbol(+(mortgage + utilities + groceries).toFixed(2))}
        </StyledDivMarginBottom>
        <StyledDivMarginBottom>
          You have still gained {user.previousGames[-1].score}
        </StyledDivMarginBottom>
        <StyledButton
          type="primary"
          onClick={() => navigate('/aliendashboard')}
        >
          Back to Dashboard
        </StyledButton>
      </StyledBudgetInfo>
    </StyledFailedBudgetContainer>
  );
};

export default FailedBudget;
