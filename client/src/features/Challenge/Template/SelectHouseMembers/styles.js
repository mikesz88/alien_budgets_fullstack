import styled from 'styled-components';

export const StyledDivWrapper = styled.div`
  text-align: center;
`;

export const StyledH1MarginBottom = styled.h1`
  margin-bottom: 2rem;
`;

export const StyledH3Description = styled.h3`
  font-weight: bold;
  ${({ marginbottom }) => (marginbottom === 'true' ? 'margin: 0 1rem;' : '')};
`;

export const StyledDivText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-decoration: underline;
`;
