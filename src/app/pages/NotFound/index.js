import asyncComponent from '@pages/asyncComponent';

export const NotFound = asyncComponent(() =>
  import(/* webpackChunkName: 'not-found' */ './NotFound')
);

export default NotFound;
