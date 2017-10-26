import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

const Root = ({ route }) => {
  return renderRoutes(route.routes);
};

Root.propTypes = {
  route: PropTypes.object.isRequired
};

export default Root;
