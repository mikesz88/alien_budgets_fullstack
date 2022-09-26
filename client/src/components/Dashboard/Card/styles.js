import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  background-color: ${({ theme, bluecolor }) =>
    bluecolor === 'blue' ? theme.colors.primaryBlue : theme.colors.white};
  color: ${({ theme, bluecolor }) =>
    bluecolor === 'blue' ? theme.colors.white : theme.colors.primaryBlue};
  font-size: 24px;
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 1rem;
`;

export const StyledText = styled.div`
  width: 250px;
  text-align: center;
`;
