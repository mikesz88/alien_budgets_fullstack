import { Input } from 'antd';
import styled from 'styled-components';

export const StyledQuestionHeader = styled.h1`
  text-align: center;
`;

export const StyledMathFactWrapper = styled.div`
  border: 1px solid transparent;
  border-radius: 8px;
  box-shadow: ${({ theme }) => `0px 10px 50px ${theme.colors.lightGrey}`};
  width: 300px;
  height: 300px;
  font-size: 3rem;
  padding: 0 3rem;
  margin: 2rem auto;
`;

export const StyledFirstNumber = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledXSecondNumber = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledInput = styled(Input)`
  padding: 1rem;
  font-size: 3rem;
  text-align: right;
`;
