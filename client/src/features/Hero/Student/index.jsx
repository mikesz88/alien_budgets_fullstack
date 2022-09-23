import React from 'react';
import StyledLink from '../../../components/Hero/HeroLink';
import StyledButton from '../../../components/PrimaryButton';
import StyledTitle from '../../../components/Title';
import HeroButtonWrapper from '../../../components/Hero/HeroButtonWrapper';
import HeroDivContainer from '../../../components/Hero/HeroDivContainer';

const Student = ({ chooseAdult, intro }) => (
  <HeroDivContainer>
    <StyledTitle>Alien Budgets</StyledTitle>
    <StyledLink to="/login/student">Returning Alien?</StyledLink>
    <StyledLink to="/register/student/part1">New Alien?</StyledLink>
    <StyledLink to="/guestUser">Visiting Alien?</StyledLink>
    <HeroButtonWrapper>
      <StyledButton type="primary" onClick={intro}>
        Go Back
      </StyledButton>
      <StyledButton type="primary" onClick={chooseAdult}>
        Adult
      </StyledButton>
    </HeroButtonWrapper>
  </HeroDivContainer>
);

export default Student;
