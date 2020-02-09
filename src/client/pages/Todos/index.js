import lazy from '@client/pages/lazy';

export default lazy(() => import(/* webpackChunkName: 'todos' */ './Todos'));
