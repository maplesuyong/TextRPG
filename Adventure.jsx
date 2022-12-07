import React, { useReducer, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SET_TURN, SET_HERO, gameOver, HeroContext } from './Logintest';

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
  monster: {},
};

const SET_MONSTER = 'SET_MONSTER';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MONSTER:
      return {
        ...state,
        monster: action.monster,
      };
  }
}

const Adventure = () => {
  console.log('adventure 컴포넌트 실행');
  const [state, dispatch_monster] = useReducer(reducer, initialState);
  const { hero, dispatch } = useContext(HeroContext);
  useEffect(() => {
    dispatch({ type: SET_TURN, turn: 1 });
    dispatch({ type: SET_HERO, hero: { ...hero, act: hero.act - 5 }});
    dispatch_monster({
      type: SET_MONSTER,
      monster: MonsterArray[Math.floor(Math.random() * 5)],
    });
  }, [])
  console.log(state.monster);
  const navigate = useNavigate();

  const onClickAttack = useCallback(() => {   // 모험 / 공격버튼
    if (hero.hp - state.monster.atk <= 0) {   // 영웅이 죽었다면
      gameOver();
      return;
    }

    if (state.monster.hp - hero.atk <= 0) {   // 공격시 몬스터가 죽는다면
      setTimeout(() => {
        alert(`${state.monster.name}이(가) 죽었습니다`);
        dispatch_monster({
          type: SET_MONSTER,
          monster: { ...state.monster, hp: state.monster.hp - hero.atk },
        });
        if (hero.exp + state.monster.exp >= hero.maxExp) {  // 몬스터를 죽이고 레벨업 경험치를 다 쌓으면
          dispatch({
            type: SET_HERO,
            hero: { ...hero,
              lv: hero.lv + 1,
              exp: hero.exp + state.monster.exp - hero.maxExp,
              maxExp: (hero.lv + 1) * 10 ,
              hp: (hero.lv + 1) * 10,
              maxHp: (hero.lv + 1) * 10,
              mp: (hero.lv + 1) * 5,
              maxMp: (hero.lv + 1) * 5,
              atk: hero.lv + 1,
            }
          });
        } else {
          dispatch({
            type: SET_HERO,
            hero: { ...hero,
              exp: hero.exp + state.monster.exp,
              hp: hero.hp - state.monster.atk,
            }
          });
        }
        navigate('/');
      }, 100)
    } else if (state.monster.hp - hero.atk > 0) {   // 공격시 몬스터가 안죽는다면
      dispatch_monster({
        type: SET_MONSTER, monster: { ...state.monster, hp: state.monster.hp - hero.atk }
      });
      dispatch({
        type: SET_HERO,
        hero: { ...hero, hp: hero.hp - state.monster.atk },
      });
    }
  }, [state.monster]);

  const onClickRunaway = useCallback(() => {  // 모험 / 도망버튼
    let result = confirm('정말로 도망가나요?');
    if(result) {
      dispatch({ type: SET_TURN, turn: 2});
      dispatch({ type: SET_HERO, hero: { ...hero, act: hero.act - 30 } });
      navigate('/');
    }
  }, [state.monster]);

  return (
    <div id="adventure">
      <div className="hero_info" style={{border: '1px solid'}}>
        <div>닉네임: {hero.name}</div>
        <div>HP: {hero.hp} / {hero.maxHp}</div>
        <div>MP: {hero.mp} / {hero.maxMp}</div>
        <div>EXP: {hero.exp} / {hero.maxExp}</div>
        <div>공격력: {hero.atk}</div>
        <div>돈: {hero.money}</div>
      </div><br/>
      <div className="monster_info">
        {Object.entries(state.monster).map((v) => {
          return (
            <div key={v[0] + v[1]}><span>{v[0].toUpperCase()}: {v[1]}</span></div>
          );
        })}
      </div>
      <div className="choice">
        <div><button onClick={onClickAttack}>공격</button></div>
        <div><button onClick={onClickRunaway}>도망</button></div>
      </div>
    </div>
  )
};


export default Adventure;