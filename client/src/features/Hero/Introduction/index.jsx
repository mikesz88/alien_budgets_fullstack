import React from 'react';
import HeroButtonWrapper from '../../../components/Hero/HeroButtonWrapper';
import HeroDivContainer from '../../../components/Hero/HeroDivContainer';
import HeroFooter from '../../../components/Hero/HeroFooter';
import StyledButton from '../../../components/PrimaryButton';
import StyledTitle from '../../../components/Title';
import { StyledSubtitle, StyledCaption } from './styles';

const Introduction = ({ chooseAdult, chooseStudent }) => (
  <HeroDivContainer>
    <StyledTitle>ALIEN BUDGETS</StyledTitle>
    <StyledSubtitle>
      WILL YOU GO BROKE <div /> OR <div /> WILL YOU BE SUCCESSFUL?
    </StyledSubtitle>
    <StyledCaption>Who are you</StyledCaption>
    <HeroButtonWrapper>
      <StyledButton type="primary" onClick={() => chooseStudent()}>
        Student
      </StyledButton>
      <StyledButton type="primary" onClick={() => chooseAdult()}>
        Adult
      </StyledButton>
    </HeroButtonWrapper>
    <HeroFooter>
      Created, designed, and developed by <div />
      <a
        href="https://www.michaelsanchez.page"
        target="_blank"
        rel="noreferrer"
      >
        Michael Sanchez
      </a>
      {` ©2022`}
    </HeroFooter>
  </HeroDivContainer>
);

export default Introduction;
