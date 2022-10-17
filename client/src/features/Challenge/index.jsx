/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import GreetingBar from '../../components/GreetingBar';
import theme from '../../theme';
import MathFacts from './MathFacts';
import { UserContext } from '../../App';
import Battleship from './Battleship';
import Template from './Template';

const Challenge = () => {
  const { gameService } = useContext(UserContext);
  const [openMathFacts, setOpenMathFacts] = useState(false);
  const [openBattleShips, setOpenBattleShips] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);

  const changeView = (view) => {
    switch (view) {
      case 'mathFacts':
        setOpenBattleShips(false);
        setOpenTemplate(false);
        setOpenMathFacts(true);
        break;
      case 'battleships':
        setOpenTemplate(false);
        setOpenMathFacts(false);
        setOpenBattleShips(true);
        break;
      case 'template':
        setOpenBattleShips(false);
        setOpenMathFacts(false);
        setOpenTemplate(true);
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   setOpenMathFacts(false);
  //   setOpenBattleShips(true);
  // }, [gameService.mathFactResults.length]);

  useEffect(() => {
    setOpenTemplate(false);
    setOpenBattleShips(false);
    setOpenMathFacts(true);
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '8rem 0',
      }}
    >
      <GreetingBar template="Game Time!" />
      {openMathFacts ? <MathFacts changeView={changeView} /> : null}
      {openBattleShips ? <Battleship changeView={changeView} /> : null}
      {openTemplate ? <Template changeView={changeView} /> : null}
    </div>
  );
};

export default Challenge;
