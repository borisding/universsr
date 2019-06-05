import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '@app/routes';
import styles from './Header.module.scss';

export default function Header() {
  return (
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
                    activeClassName={styles.active}
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
}
