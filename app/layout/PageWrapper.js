import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const PageWrapper = ({ title, children }) => (
  <>
    <Helmet title={title} />
    {children}
  </>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default PageWrapper;
