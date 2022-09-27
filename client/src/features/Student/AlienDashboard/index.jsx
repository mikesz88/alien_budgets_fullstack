/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import dashboardIcons from './helper';
import { UserContext } from '../../../App';
import StyledDashboardContainer from '../../../components/Dashboard/Container';
import StyledDashboardWrapper from '../../../components/Dashboard/Wrapper';
import Card from '../../../components/Card';

const Student = () => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <StyledDashboardWrapper>
      <GreetingBar student username={authService.username} />
      <StyledDashboardContainer style={{ padding: '0 5rem' }}>
        {dashboardIcons.map((card) => {
          let newCardLink = card.link;
          if (card.linkId) {
            newCardLink = `${card.link}${authService.id}`;
          }
          return (
            <Card
              key={card.title}
              title={card.title}
              onClick={() => navigate(newCardLink)}
              type={card.type}
            />
          );
        })}
      </StyledDashboardContainer>
    </StyledDashboardWrapper>
  );
};

export default Student;
