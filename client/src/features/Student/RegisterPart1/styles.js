import { Form } from 'antd';
import styled from 'styled-components';

export const StyledDivWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const StyledDivCustom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ marginTop }) => (marginTop === 'true' ? 'margin-top: 3rem;' : '')}
  ${({ column }) => (column === 'true' ? 'flex-direction: column;' : '')}
`;

export const StyledFormItem = styled(Form.Item)`
  width: 300px;
  ${({ margin }) =>
    margin === 'right'
      ? 'margin-right: 1rem'
      : margin === 'left'
      ? 'margin-left: 1rem'
      : ''};
`;

export const StyledBasicFormItem = styled(Form.Item)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
