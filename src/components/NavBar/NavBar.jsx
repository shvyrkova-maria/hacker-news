import React from 'react';
import Navigation from 'components/Navigation/Navigation.jsx';
import s from '../NavBar/NavBar.module.css';

function NavBar() {
  return (
    <header className={s.navigationWrap}>
      <Navigation />
    </header>
  );
}

export default NavBar;
