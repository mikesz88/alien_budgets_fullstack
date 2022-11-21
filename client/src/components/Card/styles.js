import styled from 'styled-components';
import PrimaryButton from '../PrimaryButton';

export const StyledPrimaryButton = styled(PrimaryButton)`
  padding: 4rem 2rem 6rem;
  border-radius: 20px;
  margin: 1rem;
  font-size: 24px;

  @media (max-width: 855px) {
    padding: 3rem 1.5rem 5rem;
    font-size: 18px;
  }
`;

export const StyledText = styled.div`
  width: 250px;
  text-align: center;
`;
