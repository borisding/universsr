import asyncComponent from '@pages/asyncComponent';

const Todos = asyncComponent(() =>
  import(/* webpackChunkName: 'todos' */ './Todos')
);

export default Todos;
