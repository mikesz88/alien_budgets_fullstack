import React, { useState, useContext } from 'react';
import Dice from 'react-dice-roll';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';
import {
  ERROR,
  error,
  SUCCESS,
  success,
  withMoneySymbol,
} from '../../../../common/constants';
import Notification from '../../../../components/Notification';
import StyledBasicDiv from '../../../../components/BasicDiv';
import StyledMarginDiv from './styles';
import { useAuthServiceProvider } from '../../../../providers/AuthServiceProvider';

const SelectSalary = ({ goToMonthlyBudget }) => {
  const { user, getBearerHeader, addGame } = useAuthServiceProvider();
  const { gameService } = useContext(UserContext);
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
      ? +(gameService.getJob().salaryAverage * percentage).toFixed(2)
      : withMoneySymbol(gameService.getJob().salaryAverage * percentage);
  };

  const createNewGameInGameService = (body) => {
    gameService
      .createGame(body, getBearerHeader())
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
      mathFactResults: gameService.getMathFactResults(),
      battleshipResults: gameService.getBattleshipResults(),
      month: gameService.getMonth(),
      job: gameService.getJob(),
      salary: gameService.getSalary(),
      liveInHousehold: gameService.getHouseMembers(),
      house: gameService.getHouse(),
      utilitiesPercentage: gameService.getUtilities(),
      savings: gameService.getSavings(),
      score: gameService.getScore(),
      bonusOrFine: gameService.getBonusOrFine(),
    };

    createNewGameInGameService(body);
  };

  const onFinish = () => {
    gameService.setSalary(salaryBasedOnDiceRoll(diceValue, true));
    createNewGame();
    goToMonthlyBudget();
  };

  return (
    <>
      <StyledBasicDiv>Here is your chance for your salary!</StyledBasicDiv>
      <StyledBasicDiv>You will get three tries.</StyledBasicDiv>
      <StyledBasicDiv>
        Each roll is a risk and can be the same number again!
      </StyledBasicDiv>
      <StyledBasicDiv>
        You have {tries === 1 ? '1 try left' : `${tries} tries left`}
      </StyledBasicDiv>
      <StyledBasicDiv>
        If you get a 6 you will get 125% of the average salary
      </StyledBasicDiv>
      <StyledBasicDiv>
        Projected Salary: {salaryBasedOnDiceRoll(6)}
      </StyledBasicDiv>
      <StyledBasicDiv>
        If you get a 5 you will get 112.5% of the average salary
      </StyledBasicDiv>
      <StyledBasicDiv>
        Projected Salary: {salaryBasedOnDiceRoll(5)}
      </StyledBasicDiv>
      <StyledBasicDiv>
        If you get a 3 or 4, you will receive the average salary of the job
        chosen.
      </StyledBasicDiv>
      <StyledBasicDiv>
        Projected Salary: {salaryBasedOnDiceRoll(3)}
      </StyledBasicDiv>
      <StyledBasicDiv>
        If you get a 2 you will get 87.5% of the average salary
      </StyledBasicDiv>
      <StyledBasicDiv>
        Projected Salary: {salaryBasedOnDiceRoll(2)}
      </StyledBasicDiv>
      <StyledBasicDiv>
        If you get a 1 you will get 75% of the average salary
      </StyledBasicDiv>
      <StyledBasicDiv>
        Projected Salary: {salaryBasedOnDiceRoll(1)}
      </StyledBasicDiv>
      <StyledMarginDiv>
        <Dice defaultValue={1} disabled={tries === 0} onRoll={diceRoll} />
      </StyledMarginDiv>
      <StyledBasicDiv>Your last roll was: {diceValue}</StyledBasicDiv>
      <StyledBasicDiv>
        Do not forget this is a game! Salaries are not the same for everyone
        doing the same job! This is about budgeting with what money you have!
        That is why you take the risk with the job!
      </StyledBasicDiv>
      <StyledBasicDiv>
        Salary:{' '}
        {diceValue ? salaryBasedOnDiceRoll(diceValue) : salaryBasedOnDiceRoll()}
      </StyledBasicDiv>
      <StyledButton disabled={tries === 3} type="primary" onClick={onFinish}>
        Confirm Dice Roll
      </StyledButton>
    </>
  );
};

export default SelectSalary;
