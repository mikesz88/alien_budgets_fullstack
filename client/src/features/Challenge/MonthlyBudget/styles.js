import { Form, Table } from 'antd';
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

  @media (max-width: 1023px) {
    font-size: 0.65rem;
    margin: 0 2rem;
  }
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
  width: 640px;
  margin: 0 auto;
`;

export const StyledAddRowButton = styled(StyledButton)`
  margin-bottom: 16px;
`;

export const StyledRedDiv = styled.div`
  color: ${({ theme }) => theme.colors.red};
`;

export const StyledSubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledSpanBalanceColor = styled.span`
  font-weight: bold;
  color: ${({ theme, remainingBalance }) =>
    remainingBalance < 0
      ? theme.colors.red
      : remainingBalance === 0
      ? theme.colors.green
      : theme.colors.black};
`;

export const StyledBoldSpan = styled.span`
  font-weight: bold;
`;

export const StyledTable = styled(Table)`
  margin: 0 3rem;

  @media (max-width: 1023px) {
    margin: 0 auto;
    width: 640px;
  }
`;
