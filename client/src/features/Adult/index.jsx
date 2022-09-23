/* eslint-disable no-unused-vars */
import React from 'react';
import GreetingBar from '../../components/GreetingBar';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';
import theme from '../../theme';

const Dashboard = () => (
  <div
    style={{
      backgroundColor: theme.colors.lightGrey,
      height: '100vh',
      width: '100vw',
    }}
  >
    <GreetingBar adult firstName="First Name" lastName="Last Name" />
  </div>
);

export default Dashboard;
