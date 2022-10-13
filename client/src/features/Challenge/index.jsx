import React, { useState, useEffect, useContext } from 'react';
import GreetingBar from '../../components/GreetingBar';
import theme from '../../theme';
import MathFacts from './MathFacts';
import { UserContext } from '../../App';
import Battleship from './Battleship';

const Challenge = () => {
  const { gameService } = useContext(UserContext);
  const [openMathFacts, setOpenMathFacts] = useState(false);
  const [openBattleShips, setOpenBattleShips] = useState(false);

  useEffect(() => {
    setOpenMathFacts(false);
    setOpenBattleShips(true);
  }, [gameService.mathFactResults.length]);

  useEffect(() => {
    setOpenMathFacts(true);
    setOpenBattleShips(false);
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
      {openMathFacts ? <MathFacts /> : null}
      {openBattleShips ? <Battleship /> : null}
    </div>
  );
};

export default Challenge;
