import React from 'react';
import { StyledPrimaryButton, StyledText } from './styles';

const Card = ({ type, title, ...props }) => (
  <StyledPrimaryButton {...props} type={type}>
    <StyledText>{title}</StyledText>
  </StyledPrimaryButton>
);

export default Card;
