import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from '@client/modules/base/PageTitle';
import Home from './Home';

const HomePage = () => (
  <PageTitle title={'Home'}>
    <Home />
  </PageTitle>
);

export default withRouter(connect()(HomePage));
