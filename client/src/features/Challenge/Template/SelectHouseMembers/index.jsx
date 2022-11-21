import React, { useState, useEffect } from 'react';
import StyledButton from '../../../../components/PrimaryButton';
import { useGameServiceProvider } from '../../../../services/GameServiceProvider';
import {
  StyledDivText,
  StyledDivWrapper,
  StyledH1MarginBottom,
  StyledH3Description,
} from './styles';

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
    <StyledDivWrapper>
      <StyledH1MarginBottom>Select House Members</StyledH1MarginBottom>
      <StyledH3Description marginbottom="true">
        Each person uses about in 2.5% of the monthly payment in utilities
        (electricity, gas, water, sewer, and trash).
      </StyledH3Description>
      <StyledH3Description>
        Each person&apos;s internet cost is 1% of the monthly payment.
      </StyledH3Description>
      <StyledDivText>
        You have {tries === 1 ? '1 try left' : `${tries} tries left`}
      </StyledDivText>
      <StyledButton
        disabled={tries === 0}
        type="primary"
        size="large"
        onClick={changeHouseMemberAmount}
      >
        Choose Random Number
      </StyledButton>
      <StyledDivText>
        How Many House Members:
        <br /> {selectedHouseMembers}
      </StyledDivText>
      <StyledButton type="primary" size="large" onClick={onFinish}>
        Confirm House Numbers
      </StyledButton>
    </StyledDivWrapper>
  );
};

export default SelectHouseMembers;
