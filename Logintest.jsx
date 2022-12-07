import React, { useReducer, useMemo, createContext, useCallback } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MenuMatcher from './MenuMatcher';
import Main from './Main';
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

const initialState = {
  turn: 0,
  hero: Hero1,
  inven: ['a', 'b', 'c'],
};

export const SET_TURN = 'SET_TURN';
export const SET_HERO = 'SET_HERO';
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
    case SET_INVEN:
      const newInven = [...state.inven, action.push];
      return {
        ...state,
        inven: newInven,
      };
  }
}

export const HeroContext = createContext({
  hero: {},
  dispatch: () => {},
});

export const gameOver = () => {  // 게임오버 함수
  setTimeout(() => {
    alert(`게임오버...`);
    window.location.reload()
  }, 100)
}

const Logintest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ hero: state.hero, dispatch }), [state.hero]);

  if (state.hero.act <= 0) {  // 행동력이 0이되면 게임오버
    gameOver();
  }

  const onClickRelax = useCallback(() => {  // 메인 / 휴식버튼
    let result = confirm('정말로 휴식하나요?');
    if (result) {
      dispatch({ type: SET_TURN, turn: 5});
      dispatch({
        type: SET_HERO,
        hero: { ...state.hero, hp: state.hero.maxHp, act: Math.min(state.hero.act + 30, 100) }
      });
    }
  }, [state.hero, state.turn]);

  return (
    <HeroContext.Provider value={value}>
    <BrowserRouter>
    <p>TextRPG</p><br/>
    <div>현재 턴: {state.turn}</div>
    <div>행동력: {state.hero.act}</div>
    <div><button onClick={onClickRelax}>휴식</button>&nbsp;<span>(행동력 +30, HP 풀회복 / 턴 +5)</span></div><br/>
    <div id="menu">
      <div><Link to="/">메인</Link></div>
      <div><Link to="/adventure">모험</Link></div>
      <div><Link to="/hero/info">정보창</Link></div>
      <div><Link to="/hero/inven">인벤토리</Link></div>
    </div><br/>
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/hero/:menu" element={<MenuMatcher inven={state.inven} />} />
      </Routes>
    </div><br/>
    </BrowserRouter>
    </HeroContext.Provider>
  );
}

export default Logintest;