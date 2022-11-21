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

export const StyledUsernameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

export const StyledDivFlex = styled.div`
  display: flex;
`;

export const Styled2ndRowContainer = styled.div`
  width: 300px;
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  ${({ margin }) =>
    margin === 'right' ? 'margin-right: 1rem;' : 'margin-left: 1rem;'}
`;

export const StyledPasswordContainer = styled.div`
  display: flex;
  width: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

export const StyledPasswordRules = styled.div`
  font-size: 0.75rem;
  text-align: center;
  margin-bottom: 1rem;
`;
