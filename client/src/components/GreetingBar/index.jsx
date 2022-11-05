import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import {
  StyledAdultGreetingContainer,
  StyledTitleFont,
  StyledAdultName,
  StyledStudentGreetingContainer,
  StyledButton,
} from './styles';

const GreetingBar = ({
  adult,
  student,
  firstName,
  lastName,
  username,
  template,
}) => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const backToHome = () =>
    !authService.isLoggedIn
      ? navigate('/')
      : authService.role === 'adult'
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
          <StyledButton
            style={{ height: 'fit-content' }}
            type="text"
            onClick={backToHome}
          >
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </StyledButton>
          <StyledAdultName>{template}</StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
    </>
  );
};

export default GreetingBar;
