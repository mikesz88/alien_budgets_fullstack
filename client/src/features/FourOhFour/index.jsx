import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import StyledButton from '../../components/PrimaryButton';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';

const FourOhFour = () => {
  const navigate = useNavigate();

  const backToHome = () => navigate('/');

  return (
    <HeroScreenDivWrapper>
      <Result
        status="404"
        title="404"
        subTitle="The route does not exist"
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
