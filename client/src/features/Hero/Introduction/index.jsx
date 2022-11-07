import React from 'react';
import { Link } from 'react-router-dom';
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
      <StyledCaption style={{ textAlign: 'center' }}>
        By going forward you are agreeing to the{' '}
        <Link to="/privacypolicy">Privacy Policy</Link> and{' '}
        <Link to="/termsofservice">Terms of Service</Link>
      </StyledCaption>
    </HeroButtonWrapper>
    <HeroFooter>
      Created, designed, and developed by <div />
      <a href="https://www.techysanchez.com" target="_blank" rel="noreferrer">
        Michael Sanchez
      </a>
      {` ©2022`}
    </HeroFooter>
  </HeroDivContainer>
);

export default Introduction;
