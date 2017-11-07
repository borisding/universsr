import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import PageTitle from '@common/components/PageTitle';
import Loader from '@common/components/Loader';
import Header from './Header';
import './styles/Layout.scss';

const Layout = ({ route, isClient, isFetching }) => {
  return (
    <PageTitle>
      <div styleName="container">
        <Header />
        <div styleName="content">
          {renderRoutes(route.routes)}
          {isClient && isFetching && <Loader />}
        </div>
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
