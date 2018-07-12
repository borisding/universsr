import universal from 'react-universal-component';
import { Loader } from '@common/components';
import HomePage from '@modules/home';
import { Layout, NotFound } from '@modules/base';
import { fetchTodos } from '@modules/todos/actions';
import { MIN_DELAY } from '@config';

const options = {
  minDelay: MIN_DELAY,
  loading: Loader,
  error: NotFound
};

export const routes = [
  {
    path: '/',
    exact: true,
    menu: 'Home',
    component: HomePage
  },
  {
    path: '/todos',
    exact: true,
    menu: 'Todos',
    loadData: fetchTodos,
    component: universal(import('./modules/todos'), options)
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
