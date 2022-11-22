import styled from 'styled-components';
import { Table } from 'antd';

const StyledTable = styled(Table)`
  margin: 0 3rem;

  @media (max-width: 1023px) {
    margin: 0 auto;
    width: 640px;
  }
`;

export default StyledTable;
