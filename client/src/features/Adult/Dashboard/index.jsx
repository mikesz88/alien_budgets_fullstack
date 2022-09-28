import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import dashboardIcons from './helper';
import { UserContext } from '../../../App';
import StyledDashboardContainer from '../../../components/Dashboard/Container';
import StyledDashboardWrapper from '../../../components/Dashboard/Wrapper';
import Card from '../../../components/Card';

const Dashboard = () => {
  const [id, setId] = useState('');
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getUser()
      // eslint-disable-next-line no-underscore-dangle
      .then((response) => setId(response._id));
  }, [authService]);
  console.log(id);
  console.log(authService.id);

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
            newCardLink = `${card.link}${id}`;
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

export default Dashboard;
