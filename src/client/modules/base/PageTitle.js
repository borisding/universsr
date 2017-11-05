import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

const appTitle = 'Universal App';

const PageTitle = ({ title = 'Main', children }) => (
  <DocumentTitle title={title + ' | ' + appTitle}>{children}</DocumentTitle>
);

PageTitle.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string
};

export default PageTitle;
