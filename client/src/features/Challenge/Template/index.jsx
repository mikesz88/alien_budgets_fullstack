import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import SelectJob from './SelectJob';
import SelectHouse from './SelectHouse';
import SelectHouseMembers from './SelectHouseMembers';
import SelectSalary from './SelectSalary';
import MonthlyBudget from '../MonthlyBudget';
import StyledBasicDiv from '../../../components/BasicDiv';

const Template = ({ changeView }) => {
  const { gameService } = useContext(UserContext);
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
    <StyledBasicDiv>
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
    </StyledBasicDiv>
  );
};

export default Template;
