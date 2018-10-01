import Layout, { NotFound, Home, Todos } from '@pages';
import { prefetchTodos } from '@pages/todos/actions';

export const routes = [
  {
    path: '/',
    exact: true,
    menu: 'Home',
    component: Home
  },
  {
    path: '/todos',
    exact: true,
    menu: 'Todos',
    loadData: prefetchTodos,
    component: Todos
  },
  {
    path: '/*',
    component: NotFound
  }
];

export default [
  {
    component: Layout,
    routes
  }
];
