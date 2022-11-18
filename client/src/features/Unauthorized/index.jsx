import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import StyledButton from '../../components/PrimaryButton';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';
import AlienImages from '../../components/AlienImages';

const FourOhFour = () => {
  const navigate = useNavigate();

  const backToHome = () => navigate('/');

  return (
    <HeroScreenDivWrapper>
      <AlienImages />
      <Result
        status="403"
        title="403"
        subTitle="Sorry you are not authorized to access this page. Please access with the correct credentials."
        extra={
          <StyledButton type="primary" onClick={backToHome}>
            Back to Home
          </StyledButton>
        }
      />
    </HeroScreenDivWrapper>
  );
};

export default FourOhFour;
