import { Children } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function HttpStatus({
  children,
  statusCode,
  redirectUrl = '/'
}) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext && statusCode) {
          staticContext.statusCode = statusCode;
        }

        if (staticContext && redirectUrl) {
          staticContext.redirectUrl = redirectUrl;
        }

        return Children.only(children);
      }}
    />
  );
}

HttpStatus.propTypes = {
  children: PropTypes.node.isRequired,
  statusCode: PropTypes.number.isRequired,
  redirectUrl: PropTypes.string
};
