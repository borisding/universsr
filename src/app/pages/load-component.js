import universal from 'react-universal-component';
import { Loader } from '@common/components';
import config from '@config';

// for api and options,
// @see: https://github.com/faceyspacey/react-universal-component#api-and-options
export default function loadComponent(page) {
  return universal(import(`./${page}/index`), {
    minDelay: config['MIN_DELAY'],
    loading: Loader
  });
}
