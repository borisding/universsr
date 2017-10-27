import Layout from './modules/base/Layout';
import NotFound from './modules/base/NotFound';
import HomePage from './modules/home/HomePage';
import TodosPage from './modules/todos/TodosPage';

export default [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage
      },
      {
        path: '/todos',
        exact: true,
        component: TodosPage
      },
      {
        path: '/*',
        component: NotFound
      }
    ]
  }
];
