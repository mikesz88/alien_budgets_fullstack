/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
import React from 'react';
import {
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  SQUARE_STATE,
  indexToCoords,
  updateSunkShips,
} from './layoutHelpers';

const ComputerBoard = ({
  computerShips,
  gameState,
  hitsByPlayer,
  setHitsByPlayer,
  handleComputerTurn,
  checkIfGameOver,
  setComputerShips,
  playSound,
}) => {
  // Ships on an empty layout
  let compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  //  Add hits dealt by player
  compLayout = hitsByPlayer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    compLayout
  );

  compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    compLayout
  );

  // Check what's at the square and decide what next
  const fireTorpedo = (index) => {
    if (compLayout[index] === 'ship') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
    if (compLayout[index] === 'empty') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
  };

  const playerTurn = gameState === 'player-turn';
  const playerCanFire = playerTurn && !checkIfGameOver();

  const alreadyHit = (index) =>
    compLayout[index] === 'hit' ||
    compLayout[index] === 'miss' ||
    compLayout[index] === 'ship-sunk';

  const compSquares = compLayout.map((square, index) => (
    <div
      // Only display square if it's a hit, miss, or sunk ship
      className={
        stateToClass[square] === 'hit' ||
        stateToClass[square] === 'miss' ||
        stateToClass[square] === 'ship-sunk'
          ? `square ${stateToClass[square]}`
          : `square`
      }
      key={`comp-square-${index}`}
      id={`comp-square-${index}`}
      onClick={() => {
        if (playerCanFire && !alreadyHit(index)) {
          const newHits = fireTorpedo(index);
          const shipsWithSunkFlag = updateSunkShips(newHits, computerShips);
          const sunkShipsAfter = shipsWithSunkFlag.filter(
            (ship) => ship.sunk
          ).length;
          const sunkShipsBefore = computerShips.filter(
            (ship) => ship.sunk
          ).length;
          if (sunkShipsAfter > sunkShipsBefore) {
            playSound('sunk');
          }
          setComputerShips(shipsWithSunkFlag);
          handleComputerTurn();
        }
      }}
    />
  ));

  return (
    <div>
      <h2 className="player-title">Computer</h2>
      <div className="board">{compSquares}</div>
    </div>
  );
};

export default ComputerBoard;
