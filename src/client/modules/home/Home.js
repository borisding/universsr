import React from 'react';
import styles from './styles/Home.scss';

export default () => {
  return (
    <div>
      <p className={styles.lead}>
        universsr is <strong>universal</strong> React-Redux boilerplate.
      </p>
      <a href="https://github.com/borisding/universsr">GitHub Repository</a>
    </div>
  );
};
