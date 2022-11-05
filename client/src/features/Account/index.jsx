import React, { useState } from 'react';
import { Drawer } from 'antd';
import GreetingBar from '../../components/GreetingBar';
import StyledDashboardWrapper from '../../components/Dashboard/Wrapper';
import StyledDashboardContainer from '../../components/Dashboard/Container';
import Card from '../../components/Card';
import {
  updateProfile,
  updatePassword,
  forgotQA,
  deleteAccount,
  changeAvatar,
  dashboardIcons,
} from './helper';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import ForgotQA from './ForgotQA';
import DeleteAccount from './DeleteAccount';
import ChangeAvatar from './ChangeAvatar';

const Account = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [component, setComponent] = useState('');

  const openDrawerAndCard = (value) => {
    setVisibleDrawer(true);
    setComponent(value);
  };

  const closeDrawer = () => setVisibleDrawer(false);

  return (
    <>
      <StyledDashboardWrapper>
        <GreetingBar template="Account Services" />
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
        {component === updateProfile && (
          <UpdateProfile closeDrawer={closeDrawer} />
        )}
        {component === updatePassword && (
          <UpdatePassword closeDrawer={closeDrawer} />
        )}
        {component === forgotQA && <ForgotQA closeDrawer={closeDrawer} />}
        {component === deleteAccount && (
          <DeleteAccount closeDrawer={closeDrawer} />
        )}
        {component === changeAvatar && (
          <ChangeAvatar closeDrawer={closeDrawer} />
        )}
      </Drawer>
    </>
  );
};

export default Account;
