import universal from 'react-universal-component';
import { Loader } from '@common/components';
import { ENV } from '@config';

export default function asyncComponent(page) {
  if (typeof page !== 'function') {
    throw new TypeError('Invalid data type of `page`. It must be a function.');
  }

  // for universal api and options,
  // @see: https://github.com/faceyspacey/react-universal-component#api-and-options
  return universal(page(), {
    minDelay: ENV['MIN_DELAY'],
    loading: Loader
  });
}
