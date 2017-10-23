import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ staticContext, children, statusCode, redirectUrl = '' }) => {
  if (staticContext && statusCode) {
    staticContext.statusCode = statusCode;
  }

  if (staticContext && redirectUrl) {
    staticContext.redirectUrl = redirectUrl;
  }

  return children;
};

Status.propTypes = {
  staticContext: PropTypes.object,
  children: PropTypes.element.isRequired,
  statusCode: PropTypes.number.isRequired,
  redirectUrl: PropTypes.string
};

export default Status;
