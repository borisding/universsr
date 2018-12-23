import Layout from '@layout';
import * as pages from '@pages';
import { todosActions } from '@redux/ducks/todos';

export const routes = [
  {
    path: '/',
    exact: true,
    menu: 'Home',
    component: pages.Home
  },
  {
    path: '/todos',
    exact: true,
    menu: 'Todos',
    component: pages.Todos,
    loadData: todosActions.prefetchTodos,
  },
  {
    path: '/*',
    component: pages.NotFound
  }
];

export default [
  {
    component: Layout,
    routes
  }
];
