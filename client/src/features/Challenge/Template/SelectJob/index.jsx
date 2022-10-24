/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const SelectJob = ({ goToHouseMembers }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [tries, setTries] = useState(3);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [lowEndSalary, setLowEndSalary] = useState(null);
  const [highEndSalary, setHighEndSalary] = useState(null);

  const salaryWithMoneySymbol = (salary) =>
    salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

  const getRandomJob = () => {
    setLoading(true);
    gameService
      .getRandomJob()
      .then((res) => {
        console.log(res);
        setSelectedJob(res);
        setSelectedJobTitle(res.jobTitle);
        setLowEndSalary(salaryWithMoneySymbol(res.salaryAverage * 0.75));
        setHighEndSalary(salaryWithMoneySymbol(res.salaryAverage * 1.25));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getRandomJob();
  }, []);

  const changeJob = () => {
    setTries(tries - 1);
    getRandomJob();
  };

  const onFinish = () => {
    gameService.setJob(selectedJob);
    updateService();
    console.log(gameService.getJob());
    goToHouseMembers();
  };

  return (
    <>
      <div>SelectJob</div>
      <div>You have {tries === 1 ? '1 try left' : `${tries} tries left`}</div>
      <StyledButton
        loading={loading}
        type="primary"
        disabled={tries === 0}
        onClick={changeJob}
      >
        Select Random Job
      </StyledButton>
      <div>Your random job: {selectedJobTitle}</div>
      <div>Low End Salary per year: {lowEndSalary}</div>
      <div>High End Salary per year: {highEndSalary}</div>
      <StyledButton type="primary" onClick={onFinish}>
        Confirm Job Choice
      </StyledButton>
    </>
  );
};

export default SelectJob;
