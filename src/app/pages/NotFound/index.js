import React from 'react';
import { HttpStatus, PageTitle } from '@common/components';

const NotFound = () => (
  <PageTitle title="Not Found">
    <HttpStatus statusCode={404}>
      <h3>404 - Page Not Found.</h3>
    </HttpStatus>
  </PageTitle>
);

export default NotFound;
