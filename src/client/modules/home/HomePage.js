import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from './Home';

const HomePage = () => <Home />;

export default withRouter(connect()(HomePage));
