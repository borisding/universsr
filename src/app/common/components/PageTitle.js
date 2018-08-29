import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

const appTitle = 'Universal App';

const PageTitle = ({ title = 'Main', children }) => (
  <DocumentTitle title={title + ' | ' + appTitle}>
    <Fragment>{children}</Fragment>
  </DocumentTitle>
);

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default PageTitle;
