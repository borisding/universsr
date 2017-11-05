import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import PageTitle from './PageTitle';
import styles from './styles/Layout.scss';

const Layout = ({ route, isClient, isFetching }) => {
  return (
    <PageTitle>
      <div className={styles.container}>
        <div className={styles.content}>{renderRoutes(route.routes)}</div>
        {isClient &&
          isFetching && <div className={styles.loader}>Loading...</div>}
      </div>
    </PageTitle>
  );
};

Layout.propTypes = {
  isClient: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  route: PropTypes.object.isRequired
};

export default withRouter(
  connect(state => ({
    isClient: state.isClient,
    isFetching: state.isFetching
  }))(Layout)
);
