import loadComponent from './loadComponent';

// define and export targeted async components
export const Home = loadComponent('home');
export const Todos = loadComponent('todos');

// export Layout as default, and also NotFound as named
export { default } from './layout';
export { default as NotFound } from './notfound';
