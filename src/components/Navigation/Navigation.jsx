import React, { useContext } from "react";
import { NewsContext } from "state";
import { NavLink } from "react-router-dom";
import s from "components/Navigation/Navigation.module.css";

function Navigation() {
  const { dispatch } = useContext(NewsContext);
  const handleOnNavClick = () => dispatch({ type: "RESET" });

  return (
    <header className={s.navigationWrap}>
      <ul className={s.nav}>
        <li>
          <NavLink
            to="/"
            className={s.navItem}
            activeClassName={s.navItemActive}
            onClick={handleOnNavClick}
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
            onClick={handleOnNavClick}
          >
            News
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navigation;
