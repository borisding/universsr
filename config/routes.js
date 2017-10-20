import LayoutContainer from '@modules/general/LayoutContainer';
import NotFoundContainer from '@modules/general/NotFoundContainer';
import HomeContainer from '@modules/home/HomeContainer';

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
