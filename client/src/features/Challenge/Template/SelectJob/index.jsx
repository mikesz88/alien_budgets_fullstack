import React, { useState, useEffect } from 'react';
import {
  ERROR,
  error,
  success,
  SUCCESS,
  withMoneySymbol,
} from '../../../../common/constants';
import Notification from '../../../../components/Notification';
import { useGameServiceProvider } from '../../../../services/GameServiceProvider';
import {
  StyledButtonWidthMargin,
  StyledDivWrapper,
  StyledHeaderBolded,
  StyledHeaderMarginBottom,
  StyledRandomJobAndTries,
} from './styles';

const SelectJob = ({ goToHouseMembers }) => {
  const { getRandomJob: getARandomJob, setJob } = useGameServiceProvider();
  const [loading, setLoading] = useState(false);
  const [tries, setTries] = useState(3);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [lowEndSalary, setLowEndSalary] = useState(null);
  const [highEndSalary, setHighEndSalary] = useState(null);

  const getRandomJob = () => {
    setLoading(true);
    getARandomJob()
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
    setJob(selectedJob);
    goToHouseMembers();
  };

  useEffect(() => getRandomJob(), []);

  return (
    <StyledDivWrapper>
      <StyledHeaderMarginBottom>Select Job</StyledHeaderMarginBottom>
      <StyledRandomJobAndTries>
        You have {tries === 1 ? '1 try left' : `${tries} tries left`}
      </StyledRandomJobAndTries>
      <StyledButtonWidthMargin
        marginbottom="true"
        loading={loading}
        type="primary"
        size="large"
        disabled={tries === 0}
        onClick={changeJob}
      >
        Select Random Job
      </StyledButtonWidthMargin>
      <StyledRandomJobAndTries>
        Your Random Job:
        <br /> {selectedJobTitle}
      </StyledRandomJobAndTries>
      <StyledHeaderBolded>
        Low End Salary per year: {lowEndSalary}
      </StyledHeaderBolded>
      <StyledHeaderBolded>
        High End Salary per year: {highEndSalary}
      </StyledHeaderBolded>
      <StyledButtonWidthMargin type="primary" size="large" onClick={onFinish}>
        Confirm Job Choice
      </StyledButtonWidthMargin>
    </StyledDivWrapper>
  );
};

export default SelectJob;
