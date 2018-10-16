import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { renderRoutes } from 'react-router-config';
import { ErrorBoundary } from '@common/components';
import './styles/Body.scss';

const Body = ({ route }) => {
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

Body.propTypes = {
  route: PropTypes.object.isRequired
};

export default Body;
