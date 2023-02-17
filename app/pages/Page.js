import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function Page({ title, children }) {
  return (
    <>
      <Helmet title={title} />
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
