import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
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

const withComposedConnector = compose(
  withRouter,
  connect(state => ({ isClient: state.isClient }))
)(Layout);

// mark as hot exported
export default hot(module)(withComposedConnector);
