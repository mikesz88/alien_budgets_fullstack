import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import StyledButton from '../../components/PrimaryButton';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';
import { UserContext } from '../../App';
import Notification from '../../components/Notification';
import { ERROR, error, success } from '../../common/constants';

const Logout = () => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  const logout = () => {
    authService
      .logout()
      .then((res) => Notification(success, 'Successfully Logged Out', res))
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Connection Error. You were not able to log out. Please try again later.'
        )
      );
  };

  useEffect(() => logout(), []);

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
