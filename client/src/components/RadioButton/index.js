import styled from 'styled-components';
import { Radio } from 'antd';

const StyledRadioButton = styled(Radio.Button)`
  height: 100%;
  margin: 1rem;
  border: none;

  &:hover {
    box-shadow: ${({ theme }) => `0px 0px 10px ${theme.colors.lightBlue}`};
    background-color: ${({ theme }) => theme.colors.lightBlue};
    border-radius: 10%;
  }

  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    box-shadow: ${({ theme }) => `0px 0px 20px ${theme.colors.primaryBlue}`};
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    border-radius: 10%;
  }

  &.ant-radio-button-wrapper:first-child {
    border: none;
  }

  &.ant-radio-button-wrapper:not(:first-child)::before {
    width: 0px;
    border: none;
  }
`;

export default StyledRadioButton;
