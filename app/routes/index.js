import Root from '../pages/Root';
import Home from '../pages/Home';
import Todos from '../pages/Todos';
import NotFound from '../pages/NotFound';

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
    component: Todos
  },
  {
    path: '/*',
    component: NotFound
  }
];

export default [
  {
    component: Root,
    routes
  }
];
