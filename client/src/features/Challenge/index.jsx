/* eslint-disable no-unused-vars */
import React, { useState, useEffect /* useContext */ } from 'react';
import GreetingBar from '../../components/GreetingBar';
import theme from '../../theme';
import MathFacts from './MathFacts';
import { UserContext } from '../../App';
import Battleship from './Battleship';
import Template from './Template';
import BudgetSummary from './BudgetSummary';

const Challenge = () => {
  // const { gameService } = useContext(UserContext);
  const [openMathFacts, setOpenMathFacts] = useState(false);
  const [openBattleShips, setOpenBattleShips] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [openBudgetSummary, setOpenBudgetSummary] = useState(false);

  const changeView = (view) => {
    switch (view) {
      case 'mathFacts':
        setOpenBattleShips(false);
        setOpenTemplate(false);
        setOpenBudgetSummary(false);
        setOpenMathFacts(true);
        break;
      case 'battleships':
        setOpenTemplate(false);
        setOpenMathFacts(false);
        setOpenBudgetSummary(false);
        setOpenBattleShips(true);
        break;
      case 'template':
        setOpenBattleShips(false);
        setOpenMathFacts(false);
        setOpenBudgetSummary(false);
        setOpenTemplate(true);
        break;
      case 'budgetSummary':
        setOpenBattleShips(false);
        setOpenMathFacts(false);
        setOpenTemplate(false);
        setOpenBudgetSummary(true);
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
    setOpenBattleShips(false);
    setOpenMathFacts(false);
    setOpenBudgetSummary(false);
    setOpenTemplate(true);
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
      {openTemplate ? <Template changeView={changeView} /> : null}
      {openMathFacts ? <MathFacts changeView={changeView} /> : null}
      {openBattleShips ? <Battleship changeView={changeView} /> : null}
      {openBudgetSummary ? <BudgetSummary /> : null}
    </div>
  );
};

export default Challenge;
