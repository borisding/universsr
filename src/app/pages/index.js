import loadComponent from './loadComponent';

// define and export targeted async components
export const Home = loadComponent(() => import('./Home'));
export const Todos = loadComponent(() => import('./Todos'));

// export Layout as default, and also NotFound as named
export { default } from './Layout';
export { default as NotFound } from './NotFound';
