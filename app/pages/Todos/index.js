import lazyLoad from '../lazyLoad';

export default lazyLoad(() =>
  import(/* webpackChunkName: 'todos' */ './Todos')
);
