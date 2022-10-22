/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const SelectHouseMembers = ({ goToHouse }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectedHouseMembers, setSelectedHouseMembers] = useState(0);

  return (
    <>
      <div>SelectHouseMembers</div>
      <div>How many house members: {selectedHouseMembers}</div>
      <StyledButton type="primary" onClick={goToHouse}>
        Confirm Job Choice
      </StyledButton>
    </>
  );
};

export default SelectHouseMembers;
