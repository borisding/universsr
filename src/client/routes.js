import universal from 'react-universal-component';
import HomePage from './modules/home';
import { Layout, NotFound } from './modules/base';
import { Loader } from '@common/components';
import { fetchTodos } from '@redux/todos/actions';

const options = {
  minDelay: 100,
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
