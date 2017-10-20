import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

const LayoutContainer = ({ route }) => {
  return <div>{renderRoutes(route.routes)}</div>;
};

LayoutContainer.propTypes = {
  route: PropTypes.object.isRequired
};

export default LayoutContainer;
