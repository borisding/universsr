import loadComponent from '@pages/loadComponent';

const Todos = loadComponent(() =>
  import(/* webpackChunkName: 'todos' */ './Todos')
);

export default Todos;
