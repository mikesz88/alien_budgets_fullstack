import React from 'react';
import ReplicaBox from './ReplicaBox';

// Returns a tiny replica ship and its name
const GetReplicaShip = (availableShips, shipName, selectShip) => {
  const ship = availableShips.find((item) => item.name === shipName);
  const shipLength = new Array(ship.length).fill('ship');

  const allReplicaSquares = shipLength.map((_, index) => (
    <div className="small-square" key={index} />
  ));

  return (
    <ReplicaBox
      key={shipName}
      selectShip={selectShip}
      shipName={shipName}
      squares={allReplicaSquares}
    />
  );
};

export default GetReplicaShip;
