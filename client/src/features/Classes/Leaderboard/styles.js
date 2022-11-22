import styled from 'styled-components';

export const StyledDivContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 8rem;
`;

export const StyledHeader = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.creepster};
  color: ${({ theme }) => theme.colors.primaryBlue};
  text-align: center;
  font-size: 4rem;
  margin: 0;
`;
