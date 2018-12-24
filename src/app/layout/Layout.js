import React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HELMET } from '@config';
import Header from './Header';
import Body from './Body';
import '@common/styles/global.scss';
// eslint-disable-next-line no-unused-vars
import styles from './styles/Layout.scss';

const Layout = props => (
  <div styleName="styles.container">
    <Helmet {...HELMET} />
    <Header {...props} />
    <Body {...props} />
  </div>
);

export default compose(
  withRouter,
  connect(state => ({ isClient: state.isClient }))
)(Layout);
