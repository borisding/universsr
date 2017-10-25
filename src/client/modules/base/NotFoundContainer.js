import React from 'react';
import Status from './Status';

const NotFoundContainer = () => {
  return (
    <Status statusCode={404}>
      <h3>{'404 - Page Not Found.'}</h3>
    </Status>
  );
};

export default NotFoundContainer;
