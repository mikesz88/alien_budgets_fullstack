import styled from 'styled-components';
import { Form } from 'antd';
import StyledButton from '../../../components/PrimaryButton';

export const StyledDivWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const StyledAvatarBGColorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton300 = styled(StyledButton)`
  width: 300px;
`;

export const StyledFormItem = styled(Form.Item)`
  width: 300px;
`;
