import React, { useContext } from 'react';
import { HeroContext } from './Logintest';

const Info = () => {
  const { hero } = useContext(HeroContext);
  return (
    <div id="info" style={{border: '2px solid'}}>
      {Object.entries(hero).map((v) => {
          return (
            <div key={v[0] + v[1]}><span>{v[0].toUpperCase()}: {v[1]}</span></div>
          );
      })}
    </div>
  )
}

export default Info;