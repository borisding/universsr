import isNode from 'detect-node';
import syspath from './syspath';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export { syspath, isNode, isDev, isTest };
