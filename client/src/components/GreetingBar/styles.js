/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { Button } from 'antd';

export const StyledAdultGreetingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const StyledTitleFont = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.creepster};
  font-size: 40px;
`;

export const StyledAdultName = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.hind};
  font-size: 32px;
`;

export const StyledStudentGreetingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 2rem;
  font-family: ${({ theme }) => theme.fontFamily.creepster};
  font-size: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const StyledButton = styled(Button)`
  font-family: ${({ theme }) => theme.fontFamily.creepster};
  font-size: 40px;
  color: ${({ theme }) => theme.colors.white};
`;
