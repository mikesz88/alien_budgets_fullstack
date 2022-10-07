import React from 'react';
import GreetingBar from '../../components/GreetingBar';
import theme from '../../theme';
import MathFacts from './MathFacts';

const Challenge = () => (
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
    <MathFacts />
  </div>
);

export default Challenge;
