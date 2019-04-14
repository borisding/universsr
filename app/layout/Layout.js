import React from 'react';
import Helmet from 'react-helmet';
import { Frontload } from 'react-frontload';
import { withRouter } from 'react-router-dom';
import { helmet } from '@config';
import Header from './Header';
import Body from './Body';
import '../common/styles/global.scss';
import styles from './Layout.module.scss';

const Layout = props => (
  <Frontload>
    <div styleName={'styles.container'}>
      <Helmet {...helmet} />
      <Header {...props} />
      <Body {...props} />
    </div>
  </Frontload>
);

export default withRouter(Layout);
