import styled from 'styled-components';
import { Table } from 'antd';

const StyledTable = styled(Table)`
  min-width: 640px;
  margin: 0 auto;

  @media (max-width: 1023px) {
    margin: 0 4rem;
  }
`;

export default StyledTable;
