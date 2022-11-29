import React from 'react';

const onClickShowInfo = () => {   // 메인 / 정보창보기 버튼
  document.querySelector('#info').style.display = 'block';
  document.querySelector('#infoShowBtn').style.display = 'none';
  document.querySelector('#infoCloseBtn').style.display = 'block';
}

const onClickCloseInfo = () => {   // 메인 / 정보창닫기 버튼
  document.querySelector('#info').style.display = 'none';
  document.querySelector('#infoShowBtn').style.display = 'block';
  document.querySelector('#infoCloseBtn').style.display = 'none';
}


const InfoBtn = () => {
  return (
    <div>
      <button id="infoShowBtn" onClick={onClickShowInfo} style={{display:'none'}}>정보창보기</button>
      <button id="infoCloseBtn" onClick={onClickCloseInfo}>정보창닫기</button>
    </div>
  )
}

export default InfoBtn;