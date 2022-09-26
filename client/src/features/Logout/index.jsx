import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, notification } from 'antd';
import StyledButton from '../../components/PrimaryButton';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';
import { UserContext } from '../../App';

const Logout = () => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  useEffect(() => {
    console.log('logging out');
    authService
      .logout()
      .then((res) => {
        notification.success({
          message: 'Successfully Logged Out',
          description: res,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <HeroScreenDivWrapper>
      <Result
        status="success"
        title="Logged Out"
        subTitle="You have officially logged out. Please click below to log back in."
        extra={
          <StyledButton type="primary" onClick={backToHome}>
            Back to Home
          </StyledButton>
        }
      />
    </HeroScreenDivWrapper>
  );
};

export default Logout;
