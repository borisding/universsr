import React from 'react';
import { Container, HttpStatus } from '@client/common/components';

export default function NotFound() {
  return (
    <Container title="Not Found">
      <HttpStatus statusCode={404}>
        <h3>404 - Page Not Found.</h3>
      </HttpStatus>
    </Container>
  );
}
