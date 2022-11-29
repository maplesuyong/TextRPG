import React from 'react';

const Inven = (props) => {
  return (
    <div id="inven">
      {props.inven.map((v, i) => {
        return (
          <div key={v + i}><span>{v.toUpperCase()}</span></div>
        );
      })}
    </div>
    
  )
}

export default Inven;