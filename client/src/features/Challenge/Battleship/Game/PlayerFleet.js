import React from 'react';
import ReplicaBox from './ReplicaBox';

const PlayerFleet = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  startTurn,
}) => {
  const shipsLeft = availableShips.map((ship) => ship.name);

  // For every ship still available, return a Replica Box with the ship's name and as many squares as its length
  const shipReplicaBoxes = shipsLeft.map((shipName) => (
    <ReplicaBox
      selectShip={selectShip}
      key={shipName}
      isCurrentlyPlacing={
        currentlyPlacing && currentlyPlacing.name === shipName
      }
      shipName={shipName}
      availableShips={availableShips}
    />
  ));

  const fleet = (
    <div id="replica-fleet">
      {shipReplicaBoxes}
      <p className="player-tip">Right click to rotate before you position.</p>
    </div>
  );

  const playButton = (
    <div id="play-ready">
      <p className="player-tip">Ships are in formation.</p>
      <button
        className="button"
        id="play-button"
        type="button"
        onClick={startTurn}
      >
        Start game
      </button>
    </div>
  );

  return (
    <div id="available-ships">
      <div className="tip-box-title"> Your Ships</div>
      {availableShips.length > 0 ? fleet : playButton}
    </div>
  );
};

export default PlayerFleet;
