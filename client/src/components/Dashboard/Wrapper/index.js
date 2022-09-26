import styled from 'styled-components';

const StyledDashboardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
`;

export default StyledDashboardWrapper;
