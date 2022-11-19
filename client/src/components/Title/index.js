import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.creepster};
  color: ${({ theme }) => theme.colors.primaryBlue};
  font-size: 8rem;
  text-align: center;
  margin: 0;

  @media (max-width: 1023px) {
    font-size: 5rem;
  }
`;

export default StyledTitle;
