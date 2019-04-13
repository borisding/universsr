import lazy from '@pages/lazy';

export default lazy(() => import(/* webpackChunkName: 'todos' */ './Todos'));
