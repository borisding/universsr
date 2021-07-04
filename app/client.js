import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { createFrontloadState } from 'react-frontload';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components';
import * as services from './services';

const frontloadState = createFrontloadState.client({
  context: { api: services },
  serverRenderedData: window.__UNIVERSSR_RENDERED_DATA__
});

loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <App frontloadState={frontloadState} />
    </BrowserRouter>,
    document.getElementById('root')
  );
});

// temp fix for webpack 5
// @see: https://github.com/webpack-contrib/webpack-hot-middleware/issues/390
if (module.hot) {
  module.hot.accept();
}
