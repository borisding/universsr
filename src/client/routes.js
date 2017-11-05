import universal from 'react-universal-component';
import Layout from './modules/base/Layout';
import NotFound from './modules/base/NotFound';
import { fetchTodos } from '@redux/todos/actions';

const options = {
  minDelay: 250,
  error: NotFound
};

export default [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        pageTitle: 'Home',
        component: universal(import('./modules/home/HomePage'), options)
      },
      {
        path: '/todos',
        exact: true,
        pageTitle: 'Todos',
        loadData: fetchTodos,
        component: universal(import('./modules/todos/TodosPage'), options)
      },
      {
        path: '/*',
        pageTitle: 'Page Not Found',
        component: NotFound
      }
    ]
  }
];
