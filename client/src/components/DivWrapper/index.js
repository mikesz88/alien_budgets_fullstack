import styled from 'styled-components';

const StyledDivWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 8rem 0;
`;

export default StyledDivWrapper;
