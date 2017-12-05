import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '@client/routes';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import { active } from './styles/Header.scss';

const Header = () => (
  <header>
    <nav styleName="menu">
      <ul>
        {routes.map(
          (route, index) =>
            route.menu && (
              <li key={index}>
                <NavLink
                  to={route.path}
                  exact={route.exact === true}
                  activeClassName={active}
                >
                  {route.menu}
                </NavLink>
              </li>
            )
        )}
      </ul>
    </nav>
  </header>
);

export default Header;
