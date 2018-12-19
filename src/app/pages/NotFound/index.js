import loadComponent from '@pages/loadComponent';

export const NotFound = loadComponent(() =>
  import(/* webpackChunkName: 'not-found' */ './NotFound')
);

export default NotFound;
