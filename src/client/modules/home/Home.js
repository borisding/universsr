import React from 'react';
import Table from '@common/components/table';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h3>{'Welcome to Universal React App!'}</h3>
      <Table />
      <p>
        <Link to="/not-found">{'Page not found - Click me!'}</Link>
      </p>
    </div>
  );
};
