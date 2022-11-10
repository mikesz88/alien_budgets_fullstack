import styled from 'styled-components';
import { Pagination, Radio } from 'antd';

export const StyledRegisterPart2Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledGradeLevelContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
