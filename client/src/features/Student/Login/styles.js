import { Form, Input } from 'antd';
import styled from 'styled-components';
import StyledButton from '../../../components/PrimaryButton';

export const StyledDivWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

export const StyledFormItem = styled(Form.Item)`
  width: 300px;
  ${({ left }) => (left ? 'margin-right: 1rem' : 'margin-left: 1rem')}
`;

export const StyledInput = styled(Input)`
  border-radius: 8px;
  padding: 1rem;
`;

export const StyledInputPassword = styled(Input.Password)`
  border-radius: 8px;
  padding: 1rem;
`;

export const StyledCenteredDivVaried = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ width }) => (width ? `width: ${width}px;` : '')}
  ${({ marginTop }) => (marginTop ? `margin-top: ${marginTop}rem;` : '')}
`;

export const StyledButtonMargin = styled(StyledButton)`
  ${({ left }) =>
    left === 'left' ? 'margin-left: 1rem' : 'margin-right: 1rem;'}
`;
