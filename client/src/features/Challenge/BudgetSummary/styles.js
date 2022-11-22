import { Table } from 'antd';
import styled from 'styled-components';
import StyledButton from '../../../components/PrimaryButton';

// eslint-disable-next-line import/prefer-default-export
export const StyledTable = styled(Table)`
  margin: 0 3rem;

  @media (max-width: 1023px) {
    margin: 0 auto;
    width: 640px;
  }
`;

export const StyledButtonLargeWidth = styled(StyledButton)`
  margin: 1rem 3rem;

  @media (max-width: 1023px) {
    margin: 1rem auto;
    width: 640px;
  }
`;
