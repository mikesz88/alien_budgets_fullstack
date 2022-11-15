import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledAdultGreetingContainer,
  StyledTitleFont,
  StyledAdultName,
  StyledStudentGreetingContainer,
  StyledButton,
} from './styles';
import { useAuthServiceProvider } from '../../providers/AuthServiceProvider';

const GreetingBar = ({
  adult,
  student,
  firstName,
  lastName,
  username,
  template,
}) => {
  const { user } = useAuthServiceProvider();
  const navigate = useNavigate();

  const backToHome = () =>
    !user.isLoggedIn
      ? navigate('/')
      : user.role === 'adult'
      ? navigate('/dashboard')
      : navigate('/aliendashboard');

  return (
    <>
      {adult && (
        <StyledAdultGreetingContainer>
          <StyledButton type="text" onClick={backToHome}>
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </StyledButton>
          <StyledAdultName>
            Welcome {firstName} {lastName}
          </StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
      {student && (
        <StyledStudentGreetingContainer>
          <StyledButton type="text" onClick={backToHome}>
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </StyledButton>
          <StyledButton type="text" onClick={() => navigate(`/challenge/play`)}>
            Play Game
          </StyledButton>
          <>Welcome {username}</>
        </StyledStudentGreetingContainer>
      )}
      {template && (
        <StyledAdultGreetingContainer>
          <StyledButton type="text" onClick={backToHome}>
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </StyledButton>
          <StyledAdultName>{template}</StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
    </>
  );
};

export default GreetingBar;
