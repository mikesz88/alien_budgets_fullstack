import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import dashboardIcons from './helper';
import StyledDashboardWrapper from '../../../components/Dashboard/Wrapper';
import StyledDashboardContainer from '../../../components/Dashboard/Container';
import Card from '../../../components/Card';
import { error, ERROR } from '../../../common/constants';
import Notification from '../../../components/Notification';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';

const Dashboard = () => {
  const [id, setId] = useState('');
  const { user, getUser: getCurrentUser } = useAuthServiceProvider();
  const navigate = useNavigate();

  const getUser = () =>
    getCurrentUser()
      .then((response) => {
        setId(response._id);
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Unable to grab your data. Refresh and Try again'
        )
      );

  useEffect(() => {
    getUser();
  }, []);

  return (
    <StyledDashboardWrapper>
      <GreetingBar adult firstName={user.firstName} lastName={user.lastName} />
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

export default Dashboard;
