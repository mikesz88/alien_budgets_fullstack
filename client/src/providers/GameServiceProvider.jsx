import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import Endpoints from '../common/endpoints';

const GameServiceContext = createContext({});

export const GameServiceProvider = ({ children }) => {
  const [game, setGame] = useState({
    gameId: '',
    mathFactResults: [],
    battleshipResults: [],
    month: 0,
    job: {},
    salary: 0,
    liveInHousehold: 0,
    house: {},
    utilitiesPercentage: 0,
    savings: 0,
    score: 0,
    bonusOrFine: 0,
  });

  const setPushMathFactResult = (score) =>
    setGame((prevState) => ({
      ...prevState,
      mathFactResults: [...prevState.mathFactResults, score],
    }));

  const setJob = (job) => setGame((prevState) => ({ ...prevState, job }));

  const setHouse = (house) => setGame((prevState) => ({ ...prevState, house }));

  const setUtilities = (amount) =>
    setGame((prevState) => ({ ...prevState, utilitiesPercentage: amount }));

  const setSalary = (salary) =>
    setGame((prevState) => ({ ...prevState, salary }));

  const setSavings = (amount) =>
    setGame((prevState) => ({ ...prevState, savings: amount }));

  const setPushBattleshipResult = (score) =>
    setGame((prevState) => ({
      ...prevState,
      battleshipResults: [...prevState.battleshipResults, score],
    }));

  const resetBonusFine = () =>
    setGame((prevState) => ({ ...prevState, bonusOrFine: 0 }));

  const getSavings = () => game.savings;

  const getSalary = () => game.salary;

  const getUtilities = () => game.utilitiesPercentage;

  const getHouseMembers = () => game.liveInHousehold;

  const getHouse = () => game.house;

  const getJob = () => game.job;

  const getMathFactResults = () => game.mathFactResults;

  const getBattleshipResults = () => game.battleshipResults;

  const getMonth = () => game.month;

  const getScore = () => game.score;

  const getBonusOrFine = () => game.bonusOrFine;

  const nextMonth = () =>
    setGame((prevState) => ({ ...prevState, month: prevState.month + 1 }));

  const getMathFactScore = (mathFactResult) => {
    let total = 0;
    if (mathFactResult === 100) {
      total += 500;
    } else if (mathFactResult >= 90 && mathFactResult < 100) {
      total += 250;
    } else if (mathFactResult >= 80 && mathFactResult < 90) {
      total += 100;
    } else if (mathFactResult >= 60 && mathFactResult < 70) {
      total += -100;
    } else if (mathFactResult >= 50 && mathFactResult < 60) {
      total += -250;
    } else if (mathFactResult <= 49) {
      total += -500;
    }
    return total;
  };

  const updateScoreAndBonusFine = (amount) => {
    setGame((prevState) => ({ ...prevState, score: prevState.score + amount }));
    setGame((prevState) => ({
      ...prevState,
      bonusOrFine: prevState.bonusOrFine + amount,
    }));
  };

  const updateMathFactScore = (mathFactResult) => {
    if (mathFactResult === 100) {
      updateScoreAndBonusFine(500);
    } else if (mathFactResult >= 90 && mathFactResult < 100) {
      updateScoreAndBonusFine(250);
    } else if (mathFactResult >= 80 && mathFactResult < 90) {
      updateScoreAndBonusFine(100);
    } else if (mathFactResult >= 60 && mathFactResult < 70) {
      updateScoreAndBonusFine(-100);
    } else if (mathFactResult >= 50 && mathFactResult < 60) {
      updateScoreAndBonusFine(-250);
    } else if (mathFactResult <= 49) {
      updateScoreAndBonusFine(-500);
    }
  };

  const updateBattleshipScore = (battleshipResult) => {
    setGame((prevState) => ({
      ...prevState,
      score: prevState.score + battleshipResult * 1000,
    }));
    setGame((prevState) => ({
      ...prevState,
      bonusOrFine: prevState.bonusOrFine + battleshipResult * 1000,
    }));
  };

  const updateBudgetScore = () =>
    setGame((prevState) => ({ ...prevState, score: prevState.score + 1000 }));

  const updateScoreFromSavings = (amount) => {
    setGame((prevState) => ({
      ...prevState,
      score: prevState.score + amount * 10,
    }));
    return game.score;
  };

  const resetGame = () =>
    setGame((prevState) => ({
      ...prevState,
      gameId: '',
      mathFactResults: [],
      battleshipResults: [],
      month: 0,
      job: {},
      salary: 0,
      liveInHousehold: 0,
      house: {},
      utilitiesPercentage: 0,
      savings: 0,
      score: 0,
      bonusOrFine: 0,
    }));

  const setGameFromSave = ({
    _id,
    mathFactResults,
    battleshipResults,
    month,
    job,
    salary,
    liveInHousehold,
    house,
    utilitiesPercentage,
    savings,
    score,
    bonusOrFine,
  }) =>
    setGame((prevState) => ({
      ...prevState,
      gameId: _id,
      mathFactResults,
      battleshipResults,
      month,
      job,
      salary,
      liveInHousehold,
      house,
      utilitiesPercentage,
      savings,
      score,
      bonusOrFine,
    }));

  const getRandomJob = async () => {
    const { data: response } = await axios.get(Endpoints.getJob);
    return response.data;
  };

  const getAllDwellings = async () => {
    const { data: response } = await axios.get(Endpoints.getDwellings);
    return response.data;
  };

  const getDwellingById = async (dwellingId) => {
    const { data: response } = await axios.get(
      `${Endpoints.getDwellings}/${dwellingId}`
    );
    return response.data;
  };

  const getGameById = async (gameId) => {
    const { data: response } = await axios.get(`${Endpoints.games}/${gameId}`);
    return response.data;
  };

  const createGame = async (body, headers) => {
    const { data: response } = await axios.post(
      `${Endpoints.games}`,
      body,
      headers
    );
    setGame((prevState) => ({ ...prevState, gameId: response.data._id }));
    return response.data;
  };

  const updateGameById = async (body, gameId, headers) => {
    const { data: response } = await axios.put(
      `${Endpoints.games}/${gameId}`,
      body,
      headers
    );
    return response.data;
  };

  const deleteGame = async (gameId, headers) => {
    const { data: response } = await axios.delete(
      `${Endpoints.games}/${gameId}`,
      headers
    );
    resetGame();
    return response;
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <GameServiceContext.Provider value={{ game }}>
      {children}
    </GameServiceContext.Provider>
  );
};

export const useGameServiceProvider = () => useContext(GameServiceContext);
