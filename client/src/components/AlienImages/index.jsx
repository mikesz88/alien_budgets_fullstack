import React from 'react';
import alien1 from '../../assets/vectorpaint-removebg-preview.png';
import alien2 from '../../assets/vectorpaint__2_-removebg-preview.png';
import { StyledImg, StyledImgWrapper } from './style';

const AlienImages = () => (
  <>
    <StyledImgWrapper left>
      <StyledImg src={alien1} alt="Alien Image 1" />
    </StyledImgWrapper>
    <StyledImgWrapper>
      <StyledImg src={alien2} alt="Alien Image 2" />
    </StyledImgWrapper>
  </>
);

export default AlienImages;
