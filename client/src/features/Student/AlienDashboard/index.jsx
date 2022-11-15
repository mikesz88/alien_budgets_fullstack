import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import dashboardIcons from './helper';
import { UserContext } from '../../../App';
import StyledDashboardContainer from '../../../components/Dashboard/Container';
import StyledDashboardWrapper from '../../../components/Dashboard/Wrapper';
import Card from '../../../components/Card';

const Student = () => {
  const [id, setId] = useState('');
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const getUser = () =>
    authService.getUser().then((response) => setId(response._id));

  useEffect(() => {
    getUser();
  }, [authService]);

  return (
    <StyledDashboardWrapper>
      <GreetingBar student username={authService.username} />
      <StyledDashboardContainer padding>
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

export default Student;
