import asyncComponent from '@pages/asyncComponent';

export const Home = asyncComponent(() =>
  import(/* webpackChunkName: 'home' */ './Home')
);

export default Home;
