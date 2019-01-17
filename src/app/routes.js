import Layout from '@layout';
import * as Pages from '@pages';
import { todosActions } from '@redux/ducks/todos';

export const routes = [
  {
    path: '/',
    exact: true,
    menu: 'Home',
    component: Pages.Home
  },
  {
    path: '/todos',
    exact: true,
    menu: 'Todos',
    component: Pages.Todos,
    loadData: todosActions.prefetchTodos
  },
  {
    path: '/*',
    component: Pages.NotFound
  }
];

export default [
  {
    component: Layout,
    routes
  }
];
