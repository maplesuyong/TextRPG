import React, { useContext } from 'react';
import { HeroContext } from './Logintest';

const Main = () => {
  const { hero } = useContext(HeroContext);

  return (
    <>
    <div style={{border: '1px solid'}}>
      <div>닉네임: {hero.name}</div>
      <div>레벨: {hero.lv}</div>
      <div>HP: {hero.hp} / {hero.maxHp}</div>
      <div>MP: {hero.mp} / {hero.maxMp}</div>
      <div>EXP: {hero.exp} / {hero.maxExp}</div>
      <div>공격력: {hero.atk}</div>
      <div>돈: {hero.money}</div>
    </div><br/>
    </>
  )
}

export default Main;