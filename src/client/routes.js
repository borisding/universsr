import universal from 'react-universal-component';
import Layout from './modules/base/Layout';
import HomePage from './modules/home/HomePage';
import NotFound from './modules/base/NotFound';
import Loader from '@common/components/Loader';
import { fetchTodos } from '@redux/todos/actions';

const options = {
  minDelay: 250,
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
