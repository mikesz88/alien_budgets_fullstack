import styled from 'styled-components';

const StyledDashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ padding }) => (padding ? `0 5rem` : null)};
`;

export default StyledDashboardContainer;
