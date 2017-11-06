import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import PageTitle from '@common/components/PageTitle';
import Loader from '@common/components/Loader';
import Header from './Header';
import styles from './styles/Layout.scss';

const Layout = ({ route }) => {
  return (
    <PageTitle>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          {renderRoutes(route.routes)}
          <Loader />
        </div>
      </div>
    </PageTitle>
  );
};

Layout.propTypes = {
  route: PropTypes.object.isRequired
};

export default withRouter(connect()(Layout));
