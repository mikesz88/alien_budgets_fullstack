import { Form } from 'antd';
import styled from 'styled-components';
import StyledButton from '../../../components/PrimaryButton';

export const StyledFormItem = styled(Form.Item)`
  margin: 0;
`;

export const StyledInputEditContainer = styled.div`
  padding: 5px 12px;
  cursor: pointer;
`;

export const StyledScoreGuideline = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const StyledTopInfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  font-size: 0.75rem;
  text-align: center;
`;

export const StyledDirectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 225px;
`;

export const StyledInfoText = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;

export const StyledInputDirections = styled.div`
  margin-bottom: 0.75rem;
`;

export const StyledHouseButton = styled(StyledButton)`
  margin-top: 0rem;
`;

export const StyledScoreInfo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const StyledDivWrapperCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledAddRowButton = styled(StyledButton)`
  margin-bottom: 16px;
`;

export const StyledRedDiv = styled.div`
  color: ${({ theme }) => theme.colors.red};
`;
