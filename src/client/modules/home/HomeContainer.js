import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';

const HomeContainer = () => <Home />;

export default connect()(HomeContainer);
