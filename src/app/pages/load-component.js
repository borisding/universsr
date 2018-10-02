import universal from 'react-universal-component';
import { Loader } from '@common/components';
import config from '@config';

// for api and options,
// @see: https://github.com/faceyspacey/react-universal-component#api-and-options
export default function loadComponent(page) {
  // prettier-ignore
  const toLoadPage = () => typeof page === 'function' ? page() : import(`./${page}/index`);

  return universal(toLoadPage, {
    minDelay: config['MIN_DELAY'],
    loading: Loader
  });
}
