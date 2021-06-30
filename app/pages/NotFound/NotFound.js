import React from 'react';
import { Page, HttpStatus } from '../../components';

export default function NotFound() {
  return (
    <Page title="Not Found">
      <HttpStatus statusCode={404}>
        <h3>404 - Page Not Found.</h3>
      </HttpStatus>
    </Page>
  );
}
