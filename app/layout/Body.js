import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { ErrorBoundary } from '../components';
import styles from './Body.module.scss';

export default function Body({ route }) {
  return (
    <div className={styles.content}>
      <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
    </div>
  );
}

Body.propTypes = {
  route: PropTypes.object.isRequired
};
