import universal from 'react-universal-component';
import { Loader } from '@common/components';
import { ENV } from '@config';

// for api and options,
// @see: https://github.com/faceyspacey/react-universal-component#api-and-options
export default function loadComponent(page) {
  // prettier-ignore
  const toLoadPage = () => typeof page === 'function' ? page() : import(`./${page}/index`);

  return universal(toLoadPage, {
    minDelay: ENV['MIN_DELAY'],
    loading: Loader
  });
}
