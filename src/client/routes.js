import universal from 'react-universal-component';
import Layout from './modules/base/Layout';
import NotFound from './modules/base/NotFound';
import { fetchTodos } from '@redux/todos/actions';

const options = {
  minDelay: 500,
  error: NotFound
};

export default [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: universal(import('./modules/home/HomePage'), options)
      },
      {
        path: '/todos',
        exact: true,
        loadData: fetchTodos,
        component: universal(import('./modules/todos/TodosPage'), options)
      },
      {
        path: '/*',
        component: NotFound
      }
    ]
  }
];
