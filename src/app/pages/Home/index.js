import loadComponent from '@pages/loadComponent';

export const Home = loadComponent(() =>
  import(/* webpackChunkName: 'home' */ './Home')
);

export default Home;
