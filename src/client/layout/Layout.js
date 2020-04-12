import React from 'react';
import { Helmet } from 'react-helmet';
import { Frontload } from 'react-frontload';
import { withRouter } from 'react-router-dom';
import { helmet } from '@config';
import { Header, Body } from './';
import './Layout.module.scss';

export function Layout(props) {
  return (
    <Frontload>
      <div styleName="container">
        <Helmet {...helmet} />
        <Header {...props} />
        <Body {...props} />
      </div>
    </Frontload>
  );
}

export default withRouter(Layout);
