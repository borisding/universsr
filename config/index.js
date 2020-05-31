import isNode from 'detect-node';
import helmet from './helmet';
import syspath from './syspath';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export { helmet, syspath, isNode, isDev, isTest };
