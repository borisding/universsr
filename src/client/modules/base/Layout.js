import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Body } from '@modules/base';
import { PageTitle } from '@common/components';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import './styles/Layout.scss';

const Layout = props => {
  return (
    <PageTitle>
      <div styleName="container">
        <Header />
        <Body {...props} />
      </div>
    </PageTitle>
  );
};

export default withRouter(
  connect(state => ({
    isClient: state.isClient,
    isFetching: state.isFetching
  }))(Layout)
);
