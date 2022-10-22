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

  const getRandomJob = () => {
    setLoading(true);
    gameService
      .getRandomJob()
      .then((res) => {
        console.log(res);
        setSelectedJob(res.jobTitle);
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
      <div>Your random job: {selectedJob}</div>
      <StyledButton type="primary" onClick={onFinish}>
        Confirm Job Choice
      </StyledButton>
    </>
  );
};

export default SelectJob;
