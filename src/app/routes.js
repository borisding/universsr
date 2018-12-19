import Root from '@pages/Root';
import * as pages from '@pages';
import { prefetchTodos } from '@pages/Todos/actions';

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
    loadData: prefetchTodos,
    component: pages.Todos
  },
  {
    path: '/*',
    component: pages.NotFound
  }
];

export default [
  {
    component: Root,
    routes
  }
];
