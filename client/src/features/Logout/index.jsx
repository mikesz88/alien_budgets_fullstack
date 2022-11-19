import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import StyledButton from '../../components/PrimaryButton';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';
import Notification from '../../components/Notification';
import { ERROR, error, success } from '../../common/constants';
import { useAuthServiceProvider } from '../../services/AuthServiceProvider';
import { useGameServiceProvider } from '../../services/GameServiceProvider';
import { useClassroomServiceProvider } from '../../services/ClassroomServiceProvider';
import AlienImages from '../../components/AlienImages';

const Logout = () => {
  const { logout: userLogout } = useAuthServiceProvider();
  const { resetGame } = useGameServiceProvider();
  const { resetClassroom } = useClassroomServiceProvider();
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  const logout = () => {
    userLogout()
      .then((res) => {
        resetGame();
        resetClassroom();
        Notification(success, 'Successfully Logged Out', res);
      })
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
      <AlienImages />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Result
          status="success"
          title="Logged Out"
          subTitle="You have officially logged out. Please click below to log back in."
        />
        <StyledButton type="primary" onClick={backToHome}>
          Back to Home
        </StyledButton>
      </div>
    </HeroScreenDivWrapper>
  );
};

export default Logout;
