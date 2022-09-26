/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Drawer } from 'antd';
import GreetingBar from '../../components/GreetingBar';
import StyledDashboardWrapper from '../../components/Dashboard/Wrapper';
import StyledDashboardContainer from '../../components/Dashboard/Container';
import Card from '../../components/Card';
import { UserContext } from '../../App';
import dashboardIcons from './helper';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import ForgotQA from './ForgotQA';
import DeleteAccount from './DeleteAccount';
import ChangeAvatar from './ChangeAvatar';

const Account = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const { authService } = useContext(UserContext);
  const [component, setComponent] = useState('');

  const openDrawerAndCard = (value) => {
    setVisibleDrawer(true);
    setComponent(value);
  };

  const closeDrawer = () => setVisibleDrawer(false);

  return (
    <>
      <StyledDashboardWrapper>
        {authService.role === 'adult' ? (
          <GreetingBar
            adult
            firstName={authService.firstName}
            lastName={authService.lastName}
          />
        ) : (
          <GreetingBar
            student
            username={authService.username}
            playGame={() => console.log('test')}
          />
        )}
        <StyledDashboardContainer>
          {dashboardIcons.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              onClick={() => openDrawerAndCard(card.link)}
              type={card.type}
            />
          ))}
        </StyledDashboardContainer>
      </StyledDashboardWrapper>
      <Drawer
        open={visibleDrawer}
        closable={false}
        destroyOnClose
        onClose={closeDrawer}
        size="large"
      >
        {component === 'UpdateProfile' && (
          <UpdateProfile closeDrawer={closeDrawer} />
        )}
        {component === 'UpdatePassword' && (
          <UpdatePassword closeDrawer={closeDrawer} />
        )}
        {component === 'ForgotQA' && <ForgotQA closeDrawer={closeDrawer} />}
        {component === 'DeleteAccount' && (
          <DeleteAccount closeDrawer={closeDrawer} />
        )}
        {component === 'ChangeAvatar' && (
          <ChangeAvatar closeDrawer={closeDrawer} />
        )}
      </Drawer>
    </>
  );
};

export default Account;
