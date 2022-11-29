import React from 'react';

const onClickShowInven = () => {  // 메인 / 인벤토리 열기 버튼
  document.querySelector('#inven').style.display = 'block';
  document.querySelector('#invenShowBtn').style.display = 'none';
  document.querySelector('#invenCloseBtn').style.display = 'block';
}

const onClickCloseInven = () => {  // 메인 / 인벤토리 닫기 버튼
  document.querySelector('#inven').style.display = 'none';
  document.querySelector('#invenShowBtn').style.display = 'block';
  document.querySelector('#invenCloseBtn').style.display = 'none';
}

const InvenBtn = () => {
  return (
    <div>
      <div><button id="invenShowBtn" onClick={onClickShowInven}>인벤토리 열기</button></div>
      <div><button id="invenCloseBtn" onClick={onClickCloseInven} style={{display:'none'}}>인벤토리 닫기</button></div>
    </div>
  )
}

export default InvenBtn;