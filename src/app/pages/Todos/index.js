import asyncComponent from '@pages/asyncComponent';

export default asyncComponent(() =>
  import(/* webpackChunkName: 'todos' */ './Todos')
);
