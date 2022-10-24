/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Dice from 'react-dice-roll';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const SelectSalary = ({ goToMonthlyBudget }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [diceValue, setDiceValue] = useState(null);
  const [tries, setTries] = useState(3);

  const grabDiceValue = (value) => {
    console.log(value);
  };

  const diceRoll = (value) => {
    setTries(tries - 1);
    setDiceValue(value);
    grabDiceValue(value);
  };

  const salaryBasedOnDiceRoll = (roll = 3) => {
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
    return (gameService.getJob().salaryAverage * percentage).toLocaleString(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      }
    );
  };

  const onFinish = () => {
    console.log(diceValue);
    console.log(salaryBasedOnDiceRoll(diceValue));
    gameService.setSalary(salaryBasedOnDiceRoll(diceValue));
    updateService();
    console.log(gameService.getSalary());
    goToMonthlyBudget();
  };

  return (
    <>
      <div>Here is your chance for your salary!</div>
      <div>You will get three tries.</div>
      <div>Each roll is a risk and can be the same number again!</div>
      <div>You have {tries === 1 ? '1 try left' : `${tries} tries left`}</div>
      <div>If you get a 6 you will get 125% of the average salary</div>
      <div>Projected Salary: {salaryBasedOnDiceRoll(6)}</div>
      <div>If you get a 5 you will get 112.5% of the average salary</div>
      <div>Projected Salary: {salaryBasedOnDiceRoll(5)}</div>
      <div>
        If you get a 3 or 4, you will receive the average salary of the job
        chosen.
      </div>
      <div>Projected Salary: {salaryBasedOnDiceRoll(3)}</div>
      <div>If you get a 2 you will get 87.5% of the average salary</div>
      <div>Projected Salary: {salaryBasedOnDiceRoll(2)}</div>
      <div>If you get a 1 you will get 75% of the average salary</div>
      <div>Projected Salary: {salaryBasedOnDiceRoll(1)}</div>
      <div style={{ margin: '2rem 0' }}>
        <Dice disabled={tries === 0} onRoll={diceRoll} />
      </div>
      <div>Your last roll was: {diceValue}</div>
      <div>
        Do not forget this is a game! Salaries are not the same for everyone
        doing the same job! This is about budgeting with what money you have!
        That is why you take the risk with the job!
      </div>
      <div>
        Salary:{' '}
        {diceValue ? salaryBasedOnDiceRoll(diceValue) : salaryBasedOnDiceRoll()}
      </div>
      <StyledButton disabled={tries === 3} type="primary" onClick={onFinish}>
        Confirm Dice Roll
      </StyledButton>
    </>
  );
};

export default SelectSalary;
