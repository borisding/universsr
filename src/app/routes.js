import universal from 'react-universal-component';
import { Loader, NotFound } from '@common/components';
import HomePage from '@pages/home';
import { Layout } from '@pages/base';
import { fetchTodos } from '@pages/todos/actions';
import config from '@config';

const options = {
  minDelay: config['MIN_DELAY'],
  loading: Loader
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
    component: universal(import('./pages/todos'), options)
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
