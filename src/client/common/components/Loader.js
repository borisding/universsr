import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles/Loader.scss';

const Loader = ({ isClient, isFetching }) => {
  return (
    isClient &&
    isFetching && (
      <div className={styles.loaderContainer}>
        <span>Loading...</span>
      </div>
    )
  );
};

Loader.propTypes = {
  isClient: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(state => ({
  isClient: state.isClient,
  isFetching: state.isFetching
}))(Loader);
