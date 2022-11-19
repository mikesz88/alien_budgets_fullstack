import styled from 'styled-components';

export const StyledImgWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 200px;
  height: 200px;
  ${({ left }) => (left ? 'left: 0' : 'right: 0')}
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;
