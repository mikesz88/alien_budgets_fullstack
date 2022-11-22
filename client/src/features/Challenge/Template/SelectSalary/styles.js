import styled from 'styled-components';
import StyledButton from '../../../../components/PrimaryButton';

export const StyledH1Centered = styled.h1`
  text-align: center;
`;

export const StyledDivContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 3rem;
`;

export const StyledH3BoldCenter = styled.h3`
  text-align: center;
  font-weight: bold;
`;

export const StyledDivColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledDivCentered = styled.div`
  text-align: center;
`;

export const StyledDiceDiv = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledButtonNegMargin = styled(StyledButton)`
  margin-top: -1rem;
`;

export const StyledDivInfoContainer = styled.div`
  margin: 0 auto;
  width: 300px;
  text-align: justify;
  display: flex;
  justify-content: center;
  align-items: center;
`;
