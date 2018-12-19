import React from 'react';
import { HttpStatus, PageContainer } from '@common/components';

const NotFound = () => (
  <PageContainer title="Not Found">
    <HttpStatus statusCode={404}>
      <h3>404 - Page Not Found.</h3>
    </HttpStatus>
  </PageContainer>
);

export default NotFound;
