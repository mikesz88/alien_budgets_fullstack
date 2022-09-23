import styled from 'styled-components';

export const StyledSubtitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.nosifer};
  color: ${({ theme }) => theme.colors.primaryBlue};
  font-size: 2rem;
  text-align: center;

  @media (max-width: 426px) {
    font-size: 1rem;
  }
`;

export const StyledCaption = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.hind};
  color: ${({ theme }) => theme.colors.primaryBlue};
`;
