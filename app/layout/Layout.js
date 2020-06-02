import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { helmet } from '../../config';
import { Header, Body } from '.';
import styles from './Layout.module.scss';

export function Layout(props) {
  return (
    <div className={styles.container}>
      <Helmet {...helmet} />
      <Header {...props} />
      <Body {...props} />
    </div>
  );
}

export default withRouter(Layout);
