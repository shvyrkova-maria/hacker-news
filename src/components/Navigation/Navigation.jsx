import React, { useContext } from "react";
import { NewsContext } from "../../state";
import { NavLink } from "react-router-dom";
import s from "../Navigation/Navigation.module.css";

function Navigation() {
  const { dispatch } = useContext(NewsContext);
  return (
    <ul className={s.nav}>
      <li>
        <NavLink
          to="/"
          className={s.navItem}
          activeClassName={s.navItemActive}
          onClick={() => dispatch({ type: "RESET_NEWS" })}
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
          onClick={() => dispatch({ type: "RESET_NEWS" })}
        >
          News
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
