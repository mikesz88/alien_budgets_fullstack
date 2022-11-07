/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Game from './Game/Game';
import Header from './Header';

import './css/style.css';

const Battleship = ({ changeView }) => (
  <div onContextMenu={(e) => e.preventDefault()}>
    <Header />
    <Game changeView={changeView} />
  </div>
);

export default Battleship;
