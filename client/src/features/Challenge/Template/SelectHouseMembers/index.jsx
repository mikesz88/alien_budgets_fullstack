/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { faker } from '@faker-js/faker';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const SelectHouseMembers = ({ goToHouse }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [tries, setTries] = useState(3);
  const [selectedHouseMembers, setSelectedHouseMembers] = useState(null);

  const chooseRandomNumber = () => {
    const newNumber = faker.datatype.number({ min: 0, max: 10 });
    console.log(newNumber);
    if (newNumber === selectedHouseMembers) {
      chooseRandomNumber();
    } else {
      setSelectedHouseMembers(newNumber);
    }
  };

  const changeHouseMemberAmount = () => {
    chooseRandomNumber();
    setTries(tries - 1);
  };

  const onFinish = () => {
    gameService.setHouseholdMembers(selectedHouseMembers);
    gameService.setUtilities((selectedHouseMembers * 0.035).toFixed(3));
    updateService();
    console.log(gameService.getHouseMembers());
    console.log(gameService.getUtilities());
    goToHouse();
  };

  useEffect(() => chooseRandomNumber(), []);

  return (
    <>
      <div>SelectHouseMembers</div>
      <div>
        Each person uses about in 2.5% of the monthly payment in utilities
        (electricity, gas, water, sewer, and trash).
      </div>
      <div>Each person&apos;s internet cost is 1% of the monthly payment.</div>
      <div>You have {tries === 1 ? '1 try left' : `${tries} tries left`}</div>
      <StyledButton
        disabled={tries === 0}
        type="primary"
        onClick={changeHouseMemberAmount}
      >
        Choose Random Number
      </StyledButton>
      <div>How many house members: {selectedHouseMembers}</div>
      <StyledButton type="primary" onClick={onFinish}>
        Confirm House Numbers
      </StyledButton>
    </>
  );
};

export default SelectHouseMembers;
