import React, { useCallback, useContext } from 'react';
import { SET_TURN, SET_HERO, SET_MONSTER, gameOver, HeroContext } from './Logintest';

const Adventure = ({ monster }) => {
  const { hero, dispatch } = useContext(HeroContext);

  const onClickAttack = useCallback(() => {   // 모험 / 공격버튼
    if (hero.hp - monster.atk <= 0) {   // 영웅이 죽었다면
      gameOver();
      return;
    }

    if (monster.hp - hero.atk <= 0) {   // 공격시 몬스터가 죽는다면
      setTimeout(() => {
        alert(`${monster.name}이(가) 죽었습니다`);
        dispatch({
          type: SET_MONSTER,
          monster: { ...monster, hp: monster.hp - hero.atk },
        });
        if (hero.exp + monster.exp >= hero.maxExp) {  // 몬스터를 죽이고 레벨업 경험치를 다 쌓으면
          dispatch({
            type: SET_HERO,
            hero: { ...hero,
              lv: hero.lv + 1,
              exp: hero.exp + monster.exp - hero.maxExp,
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
              exp: hero.exp + monster.exp,
              hp: hero.hp - monster.atk,
            }
          });
        }
        document.querySelector('#menu').style.display = 'block';
        document.querySelector('#adventure').style.display = 'none';
      }, 100)
    } else if (monster.hp - hero.atk > 0) {   // 공격시 몬스터가 안죽는다면
      dispatch({
        type: SET_MONSTER, monster: { ...monster, hp: monster.hp - hero.atk }
      });
      dispatch({
        type: SET_HERO,
        hero: { ...hero, hp: hero.hp - monster.atk },
      });
    }
  }, [monster]);

  const onClickRunaway = useCallback(() => {  // 모험 / 도망버튼
    let result = confirm('정말로 도망가나요?');
    if(result) {
      dispatch({ type: SET_TURN, turn: 2});
      dispatch({ type: SET_HERO, hero: { ...hero, act: hero.act - 30 } });
      dispatch({ type: SET_MONSTER, monster: {}});
      document.querySelector('#menu').style.display = 'block';
      document.querySelector('#adventure').style.display = 'none';
    }
  }, [monster]);

  return (
    <div id="adventure" style={{display:'none'}}>
      <div className="info">
        {Object.entries(monster).map((v) => {
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