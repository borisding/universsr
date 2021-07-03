import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { ErrorBoundary } from '../../components';
import { routes } from '../../routes';
import helmet from '../../static/helmet';
import styles from './Root.module.scss';

export function Root({ route }) {
  return (
    <div className={styles.container}>
      <Helmet {...helmet} />
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
      <div className={styles.content}>
        <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
      </div>
    </div>
  );
}

export default withRouter(Root);
