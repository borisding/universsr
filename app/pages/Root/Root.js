import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { ErrorBoundary } from '../../components';
import { routes } from '../../routes';
import styles from './Root.module.scss';

const helmet = {
  htmlAttributes: { lang: 'en' },
  titleTemplate: 'Universal App | %s',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css'
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/icons/favicon.ico'
    }
  ],
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    {
      name: 'description',
      content: 'Universal React Redux Boilerplate.'
    }
  ]
};

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
