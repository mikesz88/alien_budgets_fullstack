import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <>
      {adult && (
        <StyledAdultGreetingContainer>
          <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          <StyledAdultName>
            Welcome {firstName} {lastName}
          </StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
      {student && (
        <StyledStudentGreetingContainer>
          <div>ALIEN BUDGETS</div>
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
          <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          <StyledAdultName>{template}</StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
    </>
  );
};

export default GreetingBar;
