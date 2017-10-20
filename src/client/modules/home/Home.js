import React from 'react';
import Table from '@common/components/table';

export default () => {
  return (
    <div>
      <h3>{'Welcome to Universal React App!'}</h3>
      <Table />
      <p>
        <a href="/not-found">{'Page not found - Click me!'}</a>
      </p>
    </div>
  );
};
