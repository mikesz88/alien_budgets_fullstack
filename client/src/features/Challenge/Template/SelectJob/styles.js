import styled from 'styled-components';
import StyledButton from '../../../../components/PrimaryButton';

export const StyledDivWrapper = styled.div`
  text-align: center;
`;

export const StyledHeaderMarginBottom = styled.h1`
  margin-bottom: 2rem;
`;

export const StyledHeaderBolded = styled.h3`
  font-weight: bold;
`;

export const StyledButtonWidthMargin = styled(StyledButton)`
  width: 300px;
  ${({ marginbottom }) =>
    marginbottom === 'true' ? 'margin-bottom: 2rem;' : ''};
`;

export const StyledRandomJobAndTries = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  text-decoration: underline;
`;
