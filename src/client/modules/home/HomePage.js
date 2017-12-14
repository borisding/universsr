import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageTitle } from '@common/components';
import Home from './Home';

const HomePage = () => (
  <PageTitle title={'Home'}>
    <Home />
  </PageTitle>
);

export default withRouter(connect()(HomePage));
