import React from 'react';
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
  playGame,
}) => (
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
          <StyledButton type="text" onClick={playGame}>
            Play Game
          </StyledButton>
        </div>
        <div>Welcome {username}</div>
      </StyledStudentGreetingContainer>
    )}
  </>
);

export default GreetingBar;
