import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
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
    authService.role === 'adult'
      ? navigate('/dashboard')
      : navigate('/aliendashboard');

  return (
    <>
      {adult && (
        <StyledAdultGreetingContainer>
          <Button
            style={{ height: 'fit-content', color: 'white' }}
            type="text"
            onClick={backToHome}
          >
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </Button>
          <StyledAdultName>
            Welcome {firstName} {lastName}
          </StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
      {student && (
        <StyledStudentGreetingContainer>
          <Button
            style={{ height: 'fit-content', color: 'white' }}
            type="text"
            onClick={backToHome}
          >
            <div>ALIEN BUDGETS</div>
          </Button>
          <div>
            <StyledButton
              type="text"
              onClick={() => navigate('/challenge/play/')}
            >
              Play Game
            </StyledButton>
          </div>
          <div>Welcome {username}</div>
        </StyledStudentGreetingContainer>
      )}
      {template && (
        <StyledAdultGreetingContainer>
          <Button
            style={{ height: 'fit-content', color: 'white' }}
            type="text"
            onClick={backToHome}
          >
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </Button>
          <StyledAdultName>{template}</StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
    </>
  );
};

export default GreetingBar;
