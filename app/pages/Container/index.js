import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export default function Container({ title, children }) {
  return (
    <>
      <Helmet title={title} />
      {children}
    </>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
