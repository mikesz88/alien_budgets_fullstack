import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  font-family: ${({ theme }) => theme.fontFamily.nosifer};
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  border-color: ${({ theme }) => theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.lightGrey};
  box-shadow: 0px 10px 15px grey;
  border-radius: 50px;
  font-size: 3rem;
  padding: 1rem 0;
  max-width: 680px;
  width: 100%;
  max-height: 8rem;
  height: 100%;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow};
    border-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.primaryBlue};
  }

  @media (max-width: 426px) {
    font-size: 1rem;
  }
`;

export default StyledLink;
