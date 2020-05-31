import React from 'react';
import { PageContainer, HttpStatus } from '../../common/components';

function NotFound() {
  return (
    <PageContainer title="Not Found">
      <HttpStatus statusCode={404}>
        <h3>404 - Page Not Found.</h3>
      </HttpStatus>
    </PageContainer>
  );
}

export default React.memo(NotFound);
