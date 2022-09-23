import styled from 'styled-components';
import { Button } from 'antd';

const StyledButton = styled(Button)`
  font-family: ${({ font, theme }) =>
    font ? theme.fontFamily[font] : theme.fontFamily.hind};
  background-color: ${({ type, theme }) =>
    type === 'primary' ? theme.colors.primaryBlue : ''};
  border-color: ${({ type, theme }) =>
    type === 'primary' ? theme.colors.primaryBlue : ''};
  color: ${({ theme }) => theme.colors.lightGrey};
  box-shadow: 0px 10px 15px grey;
  border-radius: 50px;
  margin: 1rem;
  min-width: 150px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow};
    border-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export default StyledButton;
