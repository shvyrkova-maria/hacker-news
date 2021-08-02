import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Navigation/Navigation.module.css';

function Navigation() {
  return (
    <ul className={s.nav}>
      <li>
        <NavLink
          to="/"
          className={s.navItem}
          activeClassName={s.navItemActive}
          exact
        >
          Newest
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/news"
          className={s.navItem}
          activeClassName={s.navItemActive}
        >
          News
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
