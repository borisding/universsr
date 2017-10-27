import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import styles from './styles/Layout.scss';

const Layout = ({ route }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{renderRoutes(route.routes)}</div>
    </div>
  );
};

Layout.propTypes = {
  route: PropTypes.object.isRequired
};

export default Layout;
