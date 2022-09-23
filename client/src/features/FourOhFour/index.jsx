import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import StyledButton from '../../components/PrimaryButton';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';

const FourOhFour = () => {
  const { any } = useParams();
  const navigate = useNavigate();

  const backToHome = () => navigate('/');

  return (
    <HeroScreenDivWrapper>
      <Result
        status="404"
        title="404"
        subTitle={`Route: '/${any}' - Does not exist`}
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
