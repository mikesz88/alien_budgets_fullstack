import styled from 'styled-components';
import { Space, Form } from 'antd';

export const StyledSpace = styled(Space)`
  display: flex;
  margin-bottom: 8px;
`;

export const StyledFormItem = styled(Form.Item)`
  text-align: center;
`;

export const StyledNewClassRosterWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledStudentCardContainer = styled.div`
  border: 1px solid transparent;
  border-radius: 8px;
  box-shadow: ${({ theme }) => `0px 10px 10px ${theme.colors.lightGrey}`};
  margin: 1rem;
  padding: 0.5rem;
  width: 300px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const StyledStudentCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

export const StyledSpan = styled.span`
  font-weight: bold;
`;

export const StyledDiv = styled.div`
  text-align: center;
`;
