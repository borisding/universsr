import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export default function PageWrapper({ title, children }) {
  return (
    <>
      <Helmet title={title} />
      {children}
    </>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
