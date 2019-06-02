import React from 'react';
import { HttpStatus } from '@app/common/components';
import PageWrapper from '../PageWrapper';

export default function NotFound() {
  return (
    <PageWrapper title="Not Found">
      <HttpStatus statusCode={404}>
        <h3>404 - Page Not Found.</h3>
      </HttpStatus>
    </PageWrapper>
  );
}
