import React, { useState } from 'react';
import Dice from 'react-dice-roll';
import {
  ERROR,
  error,
  SUCCESS,
  success,
  withMoneySymbol,
} from '../../../../common/constants';
import Notification from '../../../../components/Notification';
import {
  StyledButtonNegMargin,
  StyledDiceDiv,
  StyledDivCentered,
  StyledDivColumn,
  StyledDivInfoContainer,
  StyledH1Centered,
  StyledH3BoldCenter,
} from './styles';
import { useAuthServiceProvider } from '../../../../services/AuthServiceProvider';
import { useGameServiceProvider } from '../../../../services/GameServiceProvider';

const SelectSalary = ({ goToMonthlyBudget }) => {
  const { user, getBearerHeader, addGame } = useAuthServiceProvider();
  const {
    getJob,
    createGame,
    getMathFactResults,
    getBattleshipResults,
    getMonth,
    getHouseMembers,
    getHouse,
    getUtilities,
    getSavings,
    getScore,
    getBonusOrFine,
    setSalary,
  } = useGameServiceProvider();
  const [diceValue, setDiceValue] = useState(null);
  const [tries, setTries] = useState(3);

  const diceRoll = (value) => {
    setTries(tries - 1);
    setDiceValue(value);
  };

  const salaryBasedOnDiceRoll = (roll = 3, number = false) => {
    let percentage;
    switch (roll) {
      case 1:
        percentage = 0.75;
        break;
      case 2:
        percentage = 0.875;
        break;
      case 3:
        percentage = 1;
        break;
      case 4:
        percentage = 1;
        break;
      case 5:
        percentage = 1.125;
        break;
      case 6:
        percentage = 1.25;
        break;
      default:
        break;
    }
    return number
      ? +(getJob().salaryAverage * percentage).toFixed(2)
      : withMoneySymbol(getJob().salaryAverage * percentage);
  };

  const createNewGameInGameService = (body) => {
    createGame(body, getBearerHeader())
      .then((res) => {
        addGame(res._id)
          .then(() => {
            Notification(success, SUCCESS, 'Game created and assigned to you!');
          })
          .catch(() =>
            Notification(
              error,
              ERROR,
              'Authorization Service Connection Error. Please Try again later.'
            )
          );
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Game Service Connection Error. Please Try again later.'
        )
      );
  };

  const createNewGame = () => {
    const body = {
      alienId: user.id,
      mathFactResults: getMathFactResults(),
      battleshipResults: getBattleshipResults(),
      month: getMonth(),
      job: getJob(),
      salary: salaryBasedOnDiceRoll(diceValue, true),
      liveInHousehold: getHouseMembers(),
      house: getHouse(),
      utilitiesPercentage: getUtilities(),
      savings: getSavings(),
      score: getScore(),
      bonusOrFine: getBonusOrFine(),
    };

    createNewGameInGameService(body);
  };

  const onFinish = () => {
    setSalary(salaryBasedOnDiceRoll(diceValue, true));
    createNewGame();
    goToMonthlyBudget();
  };

  return (
    <>
      <StyledH1Centered>Select Salary</StyledH1Centered>
      <StyledH3BoldCenter>
        Here is your chance for your salary! You will get three tries.
      </StyledH3BoldCenter>
      <StyledH3BoldCenter>
        Each roll is a risk and can be the same number again!
      </StyledH3BoldCenter>
      <StyledH3BoldCenter>
        You have {tries === 1 ? '1 try left' : `${tries} tries left`}
      </StyledH3BoldCenter>
      <StyledDivColumn>
        {[6, 5, 3, 2, 1].map((salary) => {
          if (salary === 3) {
            return (
              <StyledDivCentered key={salary}>
                If you get a 3 or 4 you will get: Projected Salary:{' '}
                {salaryBasedOnDiceRoll(salary)}
              </StyledDivCentered>
            );
          }
          return (
            <StyledDivCentered key={salary}>
              If you get a {salary} you will get: Projected Salary:{' '}
              {salaryBasedOnDiceRoll(salary)}
            </StyledDivCentered>
          );
        })}
      </StyledDivColumn>
      <StyledDiceDiv>
        <Dice defaultValue={1} disabled={tries === 0} onRoll={diceRoll} />
      </StyledDiceDiv>
      <StyledH3BoldCenter>Your last roll was: {diceValue}</StyledH3BoldCenter>
      <StyledDivInfoContainer>
        Do not forget this is a game! Salaries are not the same for everyone
        doing the same job! This is about budgeting with what money you have!
      </StyledDivInfoContainer>
      <StyledH3BoldCenter>
        Salary:{' '}
        {diceValue ? salaryBasedOnDiceRoll(diceValue) : salaryBasedOnDiceRoll()}
      </StyledH3BoldCenter>
      <StyledDivCentered>
        <StyledButtonNegMargin
          disabled={tries === 3}
          type="primary"
          onClick={onFinish}
        >
          Confirm Dice Roll
        </StyledButtonNegMargin>
      </StyledDivCentered>
    </>
  );
};

export default SelectSalary;
