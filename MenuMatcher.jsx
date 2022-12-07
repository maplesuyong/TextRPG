import React from 'react';
import { useParams } from 'react-router-dom';
import Info from './Info';
import Inven from './Inven';

const MenuMatcher = (props) => {
  console.log('useParams: ', useParams().menu);
  console.log(props.match);
  if (useParams().menu === 'info') {
    return (
      <Info />
    );
  } else if (useParams().menu === 'inven') {
    return (
      <Inven inven={props.inven}/>
    );
  }
}

export default MenuMatcher;