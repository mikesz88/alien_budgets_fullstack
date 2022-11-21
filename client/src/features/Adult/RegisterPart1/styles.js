// import { Form } from 'antd';
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
`;

export const StyledFormItem = styled(Form.Item)`
  ${({ width }) => (width === 'true' ? 'width: 300px;' : '')}
  ${({ margin }) =>
    margin === 'right'
      ? 'margin-right: 1rem;'
      : margin === 'left'
      ? 'margin-left: 1rem;'
      : ''}
`;

export const Styled500Div = styled.div`
  text-align: center;
  width: 500px;
  margin-bottom: 1rem;
`;
