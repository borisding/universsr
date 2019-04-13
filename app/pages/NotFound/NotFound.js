import React from 'react';
import { PageWrapper } from '@layout';
import { HttpStatus } from '@common/components';

const NotFound = () => (
  <PageWrapper title="Not Found">
    <HttpStatus statusCode={404}>
      <h3>404 - Page Not Found.</h3>
    </HttpStatus>
  </PageWrapper>
);

export default NotFound;
