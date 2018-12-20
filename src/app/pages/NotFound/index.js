import lazy from '@pages/lazy';

export default lazy(() =>
  import(/* webpackChunkName: 'not-found' */ './NotFound')
);
