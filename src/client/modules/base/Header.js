import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '@client/routes';
import styles from './styles/Header.scss';

const Header = () => (
  <header>
    <nav className={styles.menu}>
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

export default Header;
