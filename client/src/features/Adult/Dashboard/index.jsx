/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import GreetingBar from '../../../components/GreetingBar';
import dashboardIcons from './helper';
import { UserContext } from '../../../App';
import Card from '../../../components/Card';
import StyledDashboardContainer from '../../../components/Dashboard/DashboardContainer';
import StyledDashboardWrapper from '../../../components/Dashboard/DashboardWrapper';

const Dashboard = () => {
  const { authService } = useContext(UserContext);

  return (
    <StyledDashboardWrapper>
      <GreetingBar
        adult
        firstName={authService.firstName}
        lastName={authService.lastName}
      />
      <StyledDashboardContainer>
        {dashboardIcons.map((card) => {
          let newCardLink = card.link;
          if (card.linkId) {
            newCardLink = `${card.link}${authService.id}`;
          }
          return (
            <Card
              key={card.title}
              title={card.title}
              link={newCardLink}
              bluecolor={card.blueColor}
            />
          );
        })}
      </StyledDashboardContainer>
    </StyledDashboardWrapper>
  );
};

export default Dashboard;
