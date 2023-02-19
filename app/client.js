import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { createFrontloadState } from 'react-frontload';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import * as services from './services';
import App from './App';

const frontloadState = createFrontloadState.client({
  context: { api: services },
  serverRenderedData: window.__UNIVERSSR_FRONTLOAD_DATA__
});

loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <HelmetProvider>
        <App frontloadState={frontloadState} />
      </HelmetProvider>
    </BrowserRouter>,
    document.getElementById('root')
  );
});
