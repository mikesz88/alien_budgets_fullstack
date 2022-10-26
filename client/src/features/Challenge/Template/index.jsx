/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import SelectJob from './SelectJob';
import SelectHouse from './SelectHouse';
import SelectHouseMembers from './SelectHouseMembers';
import SelectSalary from './SelectSalary';
import MonthlyBudget from '../MonthlyBudget';

const BATTLESHIP_MONTH = [4, 8, 12];

const Template = ({ changeView }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [selectJob, setSelectJob] = useState(false);
  const [selectHouse, setSelectHouse] = useState(false);
  const [selectHouseMembers, setSelectHouseMembers] = useState(false);
  const [selectSalary, setSelectSalary] = useState(false);
  const [selectBudget, setSelectBudget] = useState(false);
  const [game, setGame] = useState(null);

  const goToHouseMembers = () => {
    setSelectJob(false);
    setSelectHouseMembers(true);
  };

  const goToHouse = () => {
    setSelectHouseMembers(false);
    setSelectHouse(true);
  };

  const goToSalary = () => {
    setSelectHouse(false);
    setSelectSalary(true);
  };

  const goToMonthlyBudget = () => {
    setSelectSalary(false);
    setSelectBudget(true);
  };

  const findAnotherHouse = () => {
    setSelectBudget(false);
    setSelectHouse(true);
  };

  const backToBudget = () => {
    setSelectHouse(false);
    setSelectBudget(true);
  };

  const goToNextMonth = () => {
    gameService.nextMonth();
    updateService();
  };

  useEffect(() => {
    if (gameService.month === 0) {
      setSelectJob(true);
    }
    if (BATTLESHIP_MONTH.some((month) => month === gameService.month)) {
      setGame('battleships');
    } else {
      setGame('mathFacts');
    }
  }, [gameService.month]);

  return (
    <>
      {gameService.month === 0 ? (
        <>
          {selectJob ? <SelectJob goToHouseMembers={goToHouseMembers} /> : null}
          {selectHouseMembers ? (
            <SelectHouseMembers goToHouse={goToHouse} />
          ) : null}
          {selectHouse ? (
            <SelectHouse goToSalary={goToSalary} backToBudget={backToBudget} />
          ) : null}
          {selectSalary ? (
            <SelectSalary goToMonthlyBudget={goToMonthlyBudget} />
          ) : null}
          {selectBudget ? (
            <MonthlyBudget findAnotherHouse={findAnotherHouse} />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Template;
