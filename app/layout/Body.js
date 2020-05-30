import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { ErrorBoundary } from '../common/components';
import './Body.module.scss';

export default function Body({ route }) {
  return (
    <div styleName="content">
      <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
    </div>
  );
}

Body.propTypes = {
  route: PropTypes.object.isRequired
};
