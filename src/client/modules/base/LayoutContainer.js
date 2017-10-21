import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

const LayoutContainer = ({ route }) => {
  return renderRoutes(route.routes);
};

LayoutContainer.propTypes = {
  route: PropTypes.object.isRequired
};

export default LayoutContainer;
