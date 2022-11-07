import React from 'react';
import PlayerFleet from './PlayerFleet';
import PlayerBoard from './PlayerBoard';
import ComputerBoard from './ComputerBoard';
import PlayerTips from './PlayerTips';

const GameView = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  startTurn,
  computerShips,
  gameState,
  changeTurn,
  hitComputer,
  hitsByPlayer,
  setHitsByPlayer,
  hitsByComputer,
  handleComputerTurn,
  checkIfGameOver,
  winner,
  setComputerShips,
  playSound,
  changeView,
}) => (
  <section id="game-screen">
    {gameState !== 'placement' ? (
      <PlayerTips
        gameState={gameState}
        hitsByPlayer={hitsByPlayer}
        hitsByComputer={hitsByComputer}
        winner={winner}
        changeView={changeView}
      />
    ) : (
      <PlayerFleet
        availableShips={availableShips}
        selectShip={selectShip}
        currentlyPlacing={currentlyPlacing}
        startTurn={startTurn}
      />
    )}

    <PlayerBoard
      currentlyPlacing={currentlyPlacing}
      setCurrentlyPlacing={setCurrentlyPlacing}
      rotateShip={rotateShip}
      placeShip={placeShip}
      placedShips={placedShips}
      hitsByComputer={hitsByComputer}
      playSound={playSound}
    />
    <ComputerBoard
      computerShips={computerShips}
      changeTurn={changeTurn}
      gameState={gameState}
      hitComputer={hitComputer}
      hitsByPlayer={hitsByPlayer}
      setHitsByPlayer={setHitsByPlayer}
      handleComputerTurn={handleComputerTurn}
      checkIfGameOver={checkIfGameOver}
      setComputerShips={setComputerShips}
      playSound={playSound}
    />
  </section>
);

export default GameView;
