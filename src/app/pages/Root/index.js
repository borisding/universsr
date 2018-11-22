import React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HELMET } from '@config';
import Header from './Header';
import Body from './Body';
import '@common/styles/global.scss';
import './styles/Root.scss';

const Root = props => (
  <div styleName="container">
    <Helmet {...HELMET} />
    <Header {...props} />
    <Body {...props} />
  </div>
);

export default compose(
  withRouter,
  connect(state => ({ isClient: state.isClient }))
)(Root);
