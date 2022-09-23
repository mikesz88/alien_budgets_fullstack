import React from 'react';
import { StyledLink, StyledText } from './styles';

const Card = ({ title, link, bluecolor }) => (
  <StyledLink bluecolor={bluecolor} to={link}>
    <StyledText>{title}</StyledText>
  </StyledLink>
);

export default Card;
