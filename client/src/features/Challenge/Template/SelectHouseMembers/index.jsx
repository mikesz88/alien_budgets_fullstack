import React, { useState, useEffect } from 'react';
import StyledBasicDiv from '../../../../components/BasicDiv';
import StyledButton from '../../../../components/PrimaryButton';
import { useGameServiceProvider } from '../../../../services/GameServiceProvider';

const SelectHouseMembers = ({ goToHouse }) => {
  const { setHouseholdMembers, setUtilities } = useGameServiceProvider();
  const [tries, setTries] = useState(3);
  const [selectedHouseMembers, setSelectedHouseMembers] = useState(null);

  const chooseRandomNumber = () => {
    const newNumber = Math.ceil(Math.random() * 10);
    return newNumber === selectedHouseMembers
      ? chooseRandomNumber()
      : setSelectedHouseMembers(newNumber);
  };

  const changeHouseMemberAmount = () => {
    chooseRandomNumber();
    setTries(tries - 1);
  };

  const onFinish = () => {
    setHouseholdMembers(selectedHouseMembers);
    setUtilities(+((selectedHouseMembers + 1) * 0.035).toFixed(3));
    goToHouse();
  };

  useEffect(() => chooseRandomNumber(), []);

  return (
    <>
      <StyledBasicDiv>SelectHouseMembers</StyledBasicDiv>
      <StyledBasicDiv>
        Each person uses about in 2.5% of the monthly payment in utilities
        (electricity, gas, water, sewer, and trash).
      </StyledBasicDiv>
      <StyledBasicDiv>
        Each person&apos;s internet cost is 1% of the monthly payment.
      </StyledBasicDiv>
      <StyledBasicDiv>
        You have {tries === 1 ? '1 try left' : `${tries} tries left`}
      </StyledBasicDiv>
      <StyledButton
        disabled={tries === 0}
        type="primary"
        onClick={changeHouseMemberAmount}
      >
        Choose Random Number
      </StyledButton>
      <StyledBasicDiv>
        How many house members: {selectedHouseMembers}
      </StyledBasicDiv>
      <StyledButton type="primary" onClick={onFinish}>
        Confirm House Numbers
      </StyledButton>
    </>
  );
};

export default SelectHouseMembers;
