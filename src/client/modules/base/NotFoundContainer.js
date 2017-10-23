import React from 'react';
import Status from './Status';

const NotFoundContainer = props => {
  return (
    <Status statusCode={404} {...props}>
      <h3>{'404 - Page Not Found.'}</h3>
    </Status>
  );
};

export default NotFoundContainer;
