import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../../App';
import {
  ERROR,
  error,
  success,
  SUCCESS,
  withMoneySymbol,
} from '../../../../common/constants';
import StyledBasicDiv from '../../../../components/BasicDiv';
import Notification from '../../../../components/Notification';
import StyledButton from '../../../../components/PrimaryButton';

const SelectJob = ({ goToHouseMembers }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [tries, setTries] = useState(3);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [lowEndSalary, setLowEndSalary] = useState(null);
  const [highEndSalary, setHighEndSalary] = useState(null);

  const getRandomJob = () => {
    setLoading(true);
    gameService
      .getRandomJob()
      .then((res) => {
        setSelectedJob(res);
        setSelectedJobTitle(res.jobTitle);
        setLowEndSalary(withMoneySymbol(res.salaryAverage * 0.75));
        setHighEndSalary(withMoneySymbol(res.salaryAverage * 1.25));
        Notification(success, SUCCESS, 'Random Job Found!');
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Game Service Connection Issue. Please try again later.'
        )
      )
      .finally(() => setLoading(false));
  };

  const changeJob = () => {
    setTries(tries - 1);
    getRandomJob();
  };

  const onFinish = () => {
    gameService.setJob(selectedJob);
    updateService();
    goToHouseMembers();
  };

  useEffect(() => getRandomJob(), []);

  return (
    <>
      <StyledBasicDiv>SelectJob</StyledBasicDiv>
      <StyledBasicDiv>
        You have {tries === 1 ? '1 try left' : `${tries} tries left`}
      </StyledBasicDiv>
      <StyledButton
        loading={loading}
        type="primary"
        disabled={tries === 0}
        onClick={changeJob}
      >
        Select Random Job
      </StyledButton>
      <StyledBasicDiv>Your random job: {selectedJobTitle}</StyledBasicDiv>
      <StyledBasicDiv>Low End Salary per year: {lowEndSalary}</StyledBasicDiv>
      <StyledBasicDiv>High End Salary per year: {highEndSalary}</StyledBasicDiv>
      <StyledButton type="primary" onClick={onFinish}>
        Confirm Job Choice
      </StyledButton>
    </>
  );
};

export default SelectJob;
