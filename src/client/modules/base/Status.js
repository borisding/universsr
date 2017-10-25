import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const Status = ({ children, statusCode, redirectUrl = '/' }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext && statusCode) {
        staticContext.statusCode = statusCode;
      }

      if (staticContext && redirectUrl) {
        staticContext.redirectUrl = redirectUrl;
      }

      return children;
    }}
  />
);

Status.propTypes = {
  children: PropTypes.element.isRequired,
  statusCode: PropTypes.number.isRequired,
  redirectUrl: PropTypes.string
};

export default Status;
