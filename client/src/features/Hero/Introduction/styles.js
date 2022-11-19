import styled from 'styled-components';

export const StyledSubtitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.nosifer};
  color: ${({ theme }) => theme.colors.primaryBlue};
  font-size: 2rem;
  text-align: center;

  @media (max-width: 1023px) {
    font-size: 1.5rem;
  }
`;

export const StyledCaption = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.hind};
  color: ${({ theme }) => theme.colors.primaryBlue};
  text-align: ${({ centered }) => (centered ? 'center' : '')};
`;
