import React, { useState } from 'react';
import Student from './Student';
import Adult from './Adult';
import Introduction from './Introduction';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';
import AlienImages from '../../components/AlienImages';

const Hero = () => {
  const [adult, setAdult] = useState(false);
  const [student, setStudent] = useState(false);
  const [intro, setIntro] = useState(true);

  const chooseAdult = () => {
    setStudent(false);
    setIntro(false);
    setAdult(true);
  };

  const chooseStudent = () => {
    setAdult(false);
    setIntro(false);
    setStudent(true);
  };

  const chooseIntro = () => {
    setAdult(false);
    setStudent(false);
    setIntro(true);
  };

  return (
    <HeroScreenDivWrapper>
      <AlienImages />
      {intro && (
        <Introduction chooseAdult={chooseAdult} chooseStudent={chooseStudent} />
      )}
      {adult && <Adult chooseStudent={chooseStudent} intro={chooseIntro} />}

      {student && <Student chooseAdult={chooseAdult} intro={chooseIntro} />}
    </HeroScreenDivWrapper>
  );
};

Hero.defaultProps = {
  name: 'Hero',
};

export default Hero;
