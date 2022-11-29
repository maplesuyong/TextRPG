import React, { useReducer, useCallback, createContext, useMemo } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MenuMatcher from './MenuMatcher';
import Menu from './Menu';
import Inven from './Inven';
import Adventure from './Adventure';

const Hero = (name, lv, exp, hp, mp, maxHp, maxMp, maxExp, atk, money, act) => {   // 영웅 객체
  return {
    name: name,
    lv: lv,
    exp: exp,
    hp: hp,
    mp: mp,
    maxHp: maxHp,
    maxMp: maxMp,
    maxExp: maxExp,
    atk: atk,
    money: money,
    act: act,
  }
}
const Hero1 = Hero('박수용', 1, 0, 10, 5, 10, 5, 10, 1, 0, 100);  // 영웅1(박수용) 객체 생성
const Hero2 = Hero('히어로', 5, 150, 100, 10, 100, 10, 150, 2, 0, 100);  // 영웅2(히어로) 객체 생성

const Monster = (name, lv, exp, hp, mp, atk) => {  // 몬스터 객체
  return {
    name: name,
    lv: lv,
    exp: exp,
    hp: hp,
    mp: mp,
    atk: atk,
  }
};

const MonsterArray = [  // 몬스터 종류 배열
  Monster('달팽이', 1, 3, 3, 0, 1),
  Monster('슬라임', 2, 5, 5, 0, 1),
  Monster('토끼', 3, 7, 10, 0, 1),
  Monster('들개', 5, 11, 20, 0, 2),
  Monster('늑대', 8, 20, 50, 0, 3)
];

const initialState = {
  turn: 0,
  hero: Hero1,
  monster: {},
  inven: ['a', 'b', 'c'],
};

export const HeroContext = createContext({
  hero: {},
  dispatch: () => {},
});

export const SET_TURN = 'SET_TURN';
export const SET_HERO = 'SET_HERO';
export const SET_MONSTER = 'SET_MONSTER';
export const SET_INVEN = 'SET_INVEN';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TURN:
      return {
        ...state,
        turn: state.turn + action.turn,
      };
    case SET_HERO:
      return {
        ...state,
        hero: action.hero,
      }
    case SET_MONSTER:
      return {
        ...state,
        monster: action.monster,
      };
    case SET_INVEN:
      const newInven = [...state.inven, action.push];
      return {
        ...state,
        inven: newInven,
      };
  }
}

export const gameOver = () => {  // 게임오버 함수
  setTimeout(() => {
    alert(`게임오버...`);
    window.location.reload()
  }, 100)
}

const Logintest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(MonsterArray);
  // console.log(state.inven);
  // console.log(state.monster);
  const value = useMemo(() => ({ hero: state.hero, dispatch }), [state.hero]);

  if (state.hero.act <= 0) {  // 행동력이 0이되면 게임오버
    gameOver();
  }

  // jsx에서 렌더(return)시 안에 if와 for문을 못쓴다. if는 삼항연산자로 대체 가능
  const renderTest = () => {
    return JSON.stringify(state.monster) !== '{}'
      ? <div>현재 몬스터(삼항 테스트용): {state.monster.name}</div>
      : null
  }
  // jsx에서 if문 쓰는 법 -> 함수안에 if문 넣고 즉시실행함수(()())를 사용 (for문도 즉시실행함수로 가능)
  // {(() => {
  //   if (JSON.stringify(monster) !== '{}') {
  //     return <div>현재 몬스터(삼항 테스트용): {monster.name}</div>
  //   } else {
  //     return null;
  //   }
  // })()}


  return (
    <HeroContext.Provider value={value}>
    <p>TextRPG</p><br/>
    <BrowserRouter>
    <div>
      <div><Link to="/">메인</Link></div>
      <div><Link to="/hero/info">정보창</Link></div>
      <div><Link to="/hero/inven">인벤토리</Link></div>
    </div>
    <div>
      <Routes>
        {/* <Route path="/" element={<Logintest />} /> */}
        <Route path="/hero/:menu" element={<MenuMatcher inven={state.inven} />} />
      </Routes>
    </div>
    </BrowserRouter><br/>
    <div>현재 턴: {state.turn}</div>
    <div>행동력: {state.hero.act}</div><br/>
    <div style={{border: '1px solid'}}>
      <div>닉네임: {state.hero.name}</div>
      <div>HP: {state.hero.hp} / {state.hero.maxHp}</div>
      <div>MP: {state.hero.mp} / {state.hero.maxMp}</div>
      <div>EXP: {state.hero.exp} / {state.hero.maxExp}</div>
      <div>공격력: {state.hero.atk}</div>
      <div>돈: {state.hero.money}</div>
    </div><br/>
    <Menu MonsterArray={MonsterArray} /><br/>
    <Adventure monster={state.monster} />
    {renderTest()}
    </HeroContext.Provider>
  );
}

export default Logintest;