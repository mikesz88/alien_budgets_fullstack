import React, { useState, useEffect, useContext } from 'react';
import GreetingBar from '../../components/GreetingBar';
import MathFacts from './MathFacts';
import { UserContext } from '../../App';
import Battleship from './Battleship';
import Template from './Template';
import BudgetSummary from './BudgetSummary';
import ResumeSavedGame from './ResumeSavedGame';
import StyledTemplateContainer from './Template/styles';
import {
  battleships,
  budgetSummary,
  mathFacts,
  savedGame,
  template,
} from '../../common/constants';

const Challenge = () => {
  const { authService } = useContext(UserContext);
  const [openMathFacts, setOpenMathFacts] = useState(false);
  const [openBattleShips, setOpenBattleShips] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [openBudgetSummary, setOpenBudgetSummary] = useState(false);
  const [openSavedGame, setOpenSavedGame] = useState(false);

  const changeView = (view) => {
    switch (view) {
      case mathFacts:
        setOpenBattleShips(false);
        setOpenTemplate(false);
        setOpenBudgetSummary(false);
        setOpenSavedGame(false);
        setOpenMathFacts(true);
        break;
      case battleships:
        setOpenTemplate(false);
        setOpenMathFacts(false);
        setOpenBudgetSummary(false);
        setOpenSavedGame(false);
        setOpenBattleShips(true);
        break;
      case template:
        setOpenBattleShips(false);
        setOpenMathFacts(false);
        setOpenBudgetSummary(false);
        setOpenSavedGame(false);
        setOpenTemplate(true);
        break;
      case budgetSummary:
        setOpenBattleShips(false);
        setOpenMathFacts(false);
        setOpenTemplate(false);
        setOpenSavedGame(false);
        setOpenBudgetSummary(true);
        break;
      case savedGame:
        setOpenBattleShips(false);
        setOpenMathFacts(false);
        setOpenTemplate(false);
        setOpenBudgetSummary(false);
        setOpenSavedGame(true);
        break;
      default:
        break;
    }
  };

  const checkForSavedGame = () =>
    authService.game ? changeView(savedGame) : changeView(template);

  useEffect(() => checkForSavedGame(), []);

  return (
    <StyledTemplateContainer>
      <GreetingBar template="Game Time!" />
      {openSavedGame ? <ResumeSavedGame changeView={changeView} /> : null}
      {openTemplate ? <Template changeView={changeView} /> : null}
      {openMathFacts ? <MathFacts changeView={changeView} /> : null}
      {openBattleShips ? <Battleship changeView={changeView} /> : null}
      {openBudgetSummary ? <BudgetSummary /> : null}
    </StyledTemplateContainer>
  );
};

export default Challenge;
