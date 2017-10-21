import LayoutContainer from './modules/base/LayoutContainer';
import NotFoundContainer from './modules/base/NotFoundContainer';
import HomeContainer from './modules/home/HomeContainer';

export default [
  {
    component: LayoutContainer,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomeContainer
      },
      {
        path: '/*',
        component: NotFoundContainer
      }
    ]
  }
];
