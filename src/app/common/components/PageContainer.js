import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const PageContainer = ({ title, children }) => (
  <>
    <Helmet title={title} />
    {children}
  </>
);

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default PageContainer;
