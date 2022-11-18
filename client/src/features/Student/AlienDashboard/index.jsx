import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import dashboardIcons from './helper';
import StyledDashboardContainer from '../../../components/Dashboard/Container';
import StyledDashboardWrapper from '../../../components/Dashboard/Wrapper';
import Card from '../../../components/Card';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import AlienImages from '../../../components/AlienImages';

const Student = () => {
  const { user, getUser: getUserData } = useAuthServiceProvider();
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const getUser = () => getUserData().then((response) => setId(response._id));

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <AlienImages />
      <StyledDashboardWrapper>
        <GreetingBar student username={user.username} />
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
    </>
  );
};

export default Student;
