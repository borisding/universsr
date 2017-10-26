import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h3>{'Welcome to Universal React App!'}</h3>
      <p>
        <Link to="/todos">{'Todos Demo'}</Link>
      </p>
    </div>
  );
};
