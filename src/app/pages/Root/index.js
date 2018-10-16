import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import '@common/styles/global.scss';
import './styles/Root.scss';

const Root = props => {
  return (
    <div styleName="container">
      <Header {...props} />
      <Body {...props} />
    </div>
  );
};

export default compose(
  withRouter,
  connect(state => ({ isClient: state.isClient }))
)(Root);
