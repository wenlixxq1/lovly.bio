'use client';

import React from 'react';
import StarField from './StarField';
import Meteors from './Meteors';

const SpaceEffects = () => {
  return (
    <>
      {/* Звездное поле (фон) */}
      <StarField />
      
      {/* Метеоры с физикой */}
      <Meteors />
    </>
  );
};

export default SpaceEffects;