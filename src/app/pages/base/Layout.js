import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Body } from '@pages/base';

import '@common/styles/global.css';
import './styles/Layout.scss';

const Layout = props => {
  return (
    <div styleName="container">
      <Header />
      <Body {...props} />
    </div>
  );
};

export default withRouter(
  connect(state => ({
    isClient: state.isClient
  }))(Layout)
);
