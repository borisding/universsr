import React from 'react';
import styles from './styles/Loader.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
