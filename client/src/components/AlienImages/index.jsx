/* eslint-disable no-unused-vars */
import React from 'react';
import alien1 from '../../assets/vectorpaint-removebg-preview.png';
import alien2 from '../../assets/vectorpaint__1_-removebg-preview.png';
import alien3 from '../../assets/vectorpaint__2_-removebg-preview.png';
import alien4 from '../../assets/vectorpaint__3_-removebg-preview.png';

const AlienImages = () => (
  <>
    <div
      style={{
        position: 'absolute',
        bottom: '1rem',
        left: '0',
        width: '200px',
        height: '200px',
      }}
    >
      <img style={{ width: '100%', height: '100%' }} src={alien1} alt="" />
    </div>
    {/* <div
      style={{
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '300px',
        height: '300px',
      }}
    >
      <img style={{ width: '100%' }} src={alien2} alt="" />
    </div> */}
    <div
      style={{
        position: 'absolute',
        bottom: '1rem',
        right: '0',
        width: '200px',
        height: '200px',
      }}
    >
      <img style={{ width: '100%', height: '100%' }} src={alien3} alt="" />
    </div>
    {/* <div
      style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '100px',
        height: '100px',
      }}
    >
      <img style={{ width: '100%' }} src={alien4} alt="" />
    </div> */}
  </>
);

export default AlienImages;
