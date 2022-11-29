import React, { useCallback, useContext } from 'react';
import { SET_TURN, SET_HERO, SET_MONSTER, SET_INVEN, HeroContext } from './Logintest';

const Menu = ({ MonsterArray }) => {
  const { hero, dispatch } = useContext(HeroContext);

  const onClickAdventure = useCallback(() => {  // 메인 / 모험버튼
    dispatch({ type: SET_TURN, turn: 1 });
    dispatch({ type: SET_MONSTER, monster: MonsterArray[Math.floor(Math.random() * 5)]});
    dispatch({ type: SET_HERO, hero: { ...hero, act: hero.act - 5 }})
    document.querySelector('#menu').style.display = 'none';
    document.querySelector('#adventure').style.display = 'block';
  }, [hero]);

  const onClickRelax = useCallback(() => {  // 메인 / 휴식버튼
    let result = confirm('정말로 휴식하나요?');
    if (result) {
      dispatch({ type: SET_TURN, turn: 5});
      dispatch({
        type: SET_HERO,
        hero: { ...hero, hp: hero.maxHp, act: Math.min(hero.act + 30, 100) }
      });
    }
  }, [hero]);

  const onClickPushArray = useCallback((e) => {  // 메인 / 테스트(배열 push)버튼
    dispatch({ type: SET_TURN, turn: 5});
    dispatch({ type: SET_INVEN, push: e.target.id});
  }, []);

  return (
    <>
    <div id="menu">
      <div>
        <div><button onClick={onClickAdventure}>모험</button></div>
        <div><span>(몬스터를 잡으러간다 / 턴 +1, 행동력 +5)</span></div>
      </div>
      <div>
        <div><button onClick={onClickRelax}>휴식</button></div>
        <div><span>(행동력 +30, HP 풀회복 / 턴 +5)</span></div>
      </div>
      <div>
        <div><button>장비창</button></div>
        <div><span>(장비, 강화)</span></div>
      </div>
      <div>
        <div><button>제작</button></div>
        <div><span>(요리, 도구)</span></div>
      </div>
      <div>
        <div><button id="abc" onClick={onClickPushArray}>테스트</button></div>
        <div><span>(인벤(배열)에 템넣기)</span></div>
      </div>
    </div>
    </>
  )
};

export default Menu;