import universal from 'react-universal-component';
import Layout from './modules/base/Layout';
import NotFound from './modules/base/NotFound';
import { fetchTodos } from '@redux/todos/actions';

const options = {
  minDelay: 100,
  error: NotFound
};

export const routes = [
  {
    path: '/',
    exact: true,
    menu: 'Home',
    component: universal(import('./modules/home/HomePage'), options)
  },
  {
    path: '/todos',
    exact: true,
    menu: 'Todos Demo',
    loadData: fetchTodos,
    component: universal(import('./modules/todos/TodosPage'), options)
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
