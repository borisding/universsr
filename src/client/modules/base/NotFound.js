import React from 'react';
import HttpStatus from '@common/components/HttpStatus';
import PageTitle from '@common/components/PageTitle';

const NotFound = () => {
  return (
    <PageTitle title="Not Found">
      <HttpStatus statusCode={404}>
        <h3>{'404 - Page Not Found.'}</h3>
      </HttpStatus>
    </PageTitle>
  );
};

export default NotFound;
