/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import SelectJob from './SelectJob';
import SelectHouse from './SelectHouse';
import SelectHouseMembers from './SelectHouseMembers';
import SelectSalary from './SelectSalary';
import MonthlyBudget from '../MonthlyBudget';

const Template = ({ changeView }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [selectJob, setSelectJob] = useState(true);
  const [selectHouse, setSelectHouse] = useState(false);
  const [selectHouseMembers, setSelectHouseMembers] = useState(false);
  const [selectSalary, setSelectSalary] = useState(false);
  const [selectBudget, setSelectBudget] = useState(false);

  useEffect(() => {
    if (gameService.salary) {
      setSelectJob(false);
      setSelectBudget(true);
    }
  }, []);

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
            <SelectSalary
              changeView={changeView}
              goToMonthlyBudget={goToMonthlyBudget}
            />
          ) : null}
          {selectBudget ? (
            <MonthlyBudget
              changeView={changeView}
              findAnotherHouse={findAnotherHouse}
            />
          ) : null}
        </>
      ) : (
        <MonthlyBudget changeView={changeView} />
      )}
    </>
  );
};

export default Template;
