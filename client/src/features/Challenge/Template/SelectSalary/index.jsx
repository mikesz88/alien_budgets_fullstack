import React, { useState } from 'react';
import Dice from 'react-dice-roll';
import StyledButton from '../../../../components/PrimaryButton';
import {
  ERROR,
  error,
  SUCCESS,
  success,
  withMoneySymbol,
} from '../../../../common/constants';
import Notification from '../../../../components/Notification';
import StyledMarginDiv from './styles';
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
      <h1 style={{ textAlign: 'center' }}>Select Salary</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3 style={{ textAlign: 'left', fontWeight: 'bold' }}>
          Here is your chance for your salary!
        </h3>
        <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>
          You will get three tries.
        </h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3 style={{ textAlign: 'left', fontWeight: 'bold' }}>
          Each roll is a risk and can be the same number again!
        </h3>
        <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>
          You have {tries === 1 ? '1 try left' : `${tries} tries left`}
        </h3>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          If you get a 6 you will get: Projected Salary:{' '}
          {salaryBasedOnDiceRoll(6)}
        </div>
        <div style={{ textAlign: 'center' }}>
          If you get a 5 you will get: Projected Salary:{' '}
          {salaryBasedOnDiceRoll(5)}
        </div>
        <div style={{ textAlign: 'center' }}>
          If you get a 3 or 4, you will get: Projected Salary:{' '}
          {salaryBasedOnDiceRoll(3)}
        </div>
        <div style={{ textAlign: 'center' }}>
          If you get a 2 you will get: Projected Salary:{' '}
          {salaryBasedOnDiceRoll(2)}
        </div>
        <div style={{ textAlign: 'center' }}>
          If you get a 1 you will get: Projected Salary:{' '}
          {salaryBasedOnDiceRoll(1)}
        </div>
      </div>
      <StyledMarginDiv>
        <Dice defaultValue={1} disabled={tries === 0} onRoll={diceRoll} />
      </StyledMarginDiv>
      <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Your last roll was: {diceValue}
      </h3>
      <div
        style={{
          margin: '0 auto',
          width: '300px',
          textAlign: 'justify',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Do not forget this is a game! Salaries are not the same for everyone
        doing the same job! This is about budgeting with what money you have!
        That is why you take the risk with the job!
      </div>
      <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Salary:{' '}
        {diceValue ? salaryBasedOnDiceRoll(diceValue) : salaryBasedOnDiceRoll()}
      </h3>{' '}
      <div style={{ textAlign: 'center' }}>
        <StyledButton disabled={tries === 3} type="primary" onClick={onFinish}>
          Confirm Dice Roll
        </StyledButton>
      </div>
    </>
  );
};

export default SelectSalary;
