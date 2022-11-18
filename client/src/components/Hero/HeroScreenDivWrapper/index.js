import styled from 'styled-components';

const HeroScreenDivWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export default HeroScreenDivWrapper;
