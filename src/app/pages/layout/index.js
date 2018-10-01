import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withRouter, NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from '@app/routes';
import { ErrorBoundary } from '@common/components';
import '@common/styles/global.css';
import { active } from './styles/Layout.scss';

const renderHeader = () => {
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
};

const renderBody = ({ route }) => {
  return (
    <div styleName="content">
      <ErrorBoundary>
        {renderRoutes(route.routes)}
        <Alert
          stack={{ limit: 1 }}
          position="bottom"
          effect="flip"
          timeout={5000}
        />
      </ErrorBoundary>
    </div>
  );
};

const Layout = props => {
  return (
    <div styleName="container">
      {renderHeader()}
      {renderBody(props)}
    </div>
  );
};

Layout.propTypes = {
  route: PropTypes.object.isRequired
};

const withComposedConnector = compose(
  withRouter,
  connect(state => ({ isClient: state.isClient }))
)(Layout);

// mark as hot exported
export default hot(module)(withComposedConnector);
