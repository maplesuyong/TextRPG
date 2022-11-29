import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MenuMatcher from './MenuMatcher';
import Logintest from './Logintest';
import Info from './Info';
import Inven from './Inven'

const Router = () => {
  return (
    <BrowserRouter>
    <div>
      <div><Link to="/">메인</Link></div>
      <div><Link to="/hero/info">정보창</Link></div>
      <div><Link to="/hero/inven">인벤토리</Link></div>
    </div>
    <div>
      <Routes>
        <Route path="/" element={<Logintest />} />
        <Route path="/hero/:menu" element={<MenuMatcher />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
};

export default Router;