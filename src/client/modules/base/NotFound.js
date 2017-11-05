import React from 'react';
import PageTitle from './PageTitle';
import Status from './Status';

const NotFound = () => {
  return (
    <PageTitle title="Not Found">
      <Status statusCode={404}>
        <h3>{'404 - Page Not Found.'}</h3>
      </Status>
    </PageTitle>
  );
};

export default NotFound;
