/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import SelectJob from './SelectJob';

const BATTLESHIP_MONTH = [4, 8, 12];

const Template = ({ changeView }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [selectJob, setSelectJob] = useState(false);
  const [selectHouse, setSelectHouse] = useState(false);
  const [houseMembersAndUtilities, setHouseMembersAndUtilities] =
    useState(false);
  const [game, setGame] = useState(null);

  const goToNextMonth = () => {
    gameService.nextMonth();
    updateService();
  };

  useEffect(() => {
    if (gameService.month === 0) {
      setSelectJob(true);
    }
    if (BATTLESHIP_MONTH.some((month) => month === gameService.month)) {
      setGame('battleships');
    } else {
      setGame('mathFacts');
    }
  }, [gameService.month]);

  return (
    <>
      <div>Test</div>
      {gameService.month === 0 ? <>{selectJob ? <SelectJob /> : null}</> : null}
    </>
  );
};

export default Template;
