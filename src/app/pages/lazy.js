import universal from 'react-universal-component';
import { PageLoader } from '@layout';

// page util to lazy load targeted page component by accepting callback
export default function lazy(page) {
  if (typeof page !== 'function') {
    throw new TypeError('Invalid data type of `page`. It must be a function.');
  }

  // for universal api and options,
  // @see: https://github.com/faceyspacey/react-universal-component#api-and-options
  return universal(page(), {
    minDelay: process.env.MIN_DELAY,
    loading: PageLoader
  });
}
