import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Loader from '@common/components/Loader';
import './styles/Body.scss';

const Body = ({ route, isClient, isFetching }) => {
  return (
    <div styleName="content">
      {renderRoutes(route.routes)}
      {isClient && isFetching && <Loader />}
    </div>
  );
};

Body.propTypes = {
  route: PropTypes.object.isRequired,
  isClient: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Body;
