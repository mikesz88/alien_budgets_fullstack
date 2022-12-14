import { Form, Space } from 'antd';
import styled from 'styled-components';

export const StyledCreateClassroomContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  display: flex;
  justify-content: center;
  padding-top: 8rem;
  min-height: 100vh;
`;

export const StyledSpacing = styled(Space)`
  display: flex;
  margin-bottom: 8px;
`;

export const StyledCenteredFormItem = styled(Form.Item)`
  text-align: center;
`;

export const StyledRosterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: 100%;
`;

export const StyledRosterHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTitle = styled.h1`
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.hind};
`;

export const StyledStudentListContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledStudentCard = styled.div`
  width: 350px;
  margin: 1rem;
  border: 1px solid transparent;
  border-radius: 8px;
  box-shadow: ${({ theme }) => `0px 10px 10px ${theme.colors.black}`};
`;

export const StyledStudentListItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

export const StyledBoldedSpan = styled.span`
  font-weight: bold;
`;
