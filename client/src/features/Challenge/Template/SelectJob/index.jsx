/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const SelectJob = () => {
  const { gameService, updateService } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [tries, setTries] = useState(3);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    gameService
      .getRandomJob()
      .then((res) => {
        console.log(res);
        setSelectedJob(res.jobTitle);
      })
      .catch((error) => console.error(error));
  }, []);

  const onFinish = () => {
    console.log(selectedJob);
  };

  return (
    <>
      <div>SelectJob</div>
      <div>You have {tries === 1 ? '1 try left' : `${tries} tries left`}</div>
      <StyledButton
        type="primary"
        disabled={tries === 0}
        onClick={() => setTries(tries - 1)}
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
