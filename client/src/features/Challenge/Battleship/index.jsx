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

// {
//   const [appState, setAppState] = useState('welcome'); // play or welcome

//   const startPlay = () => {
//     setAppState('play');
//   };

//   // Renders either Welcome Screen or Game
//   return (
//     <div onContextMenu={(e) => e.preventDefault()}>
//       <Header />
//       {appState === 'play' ? <Game /> : <WelcomeScreen startPlay={startPlay} />}
//       <Footer />
//     </div>
//   );
// };

export default Battleship;
