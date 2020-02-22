import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

function PageContainer({ title, children }) {
  return (
    <>
      <Helmet title={title} />
      {children}
    </>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default React.memo(PageContainer);
