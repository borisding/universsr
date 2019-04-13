import universal from 'react-universal-component';

// page util to lazy load targeted page component by accepting callback
export default function lazy(page, options = {}) {
  if (typeof page !== 'function') {
    throw new TypeError('Invalid data type of `page`. It must be a function.');
  }

  // default options for async component
  const defaultOptions = {
    minDelay: parseInt(process.env.MIN_DELAY, 10)
  };

  // for universal api and options,
  // @see: https://github.com/faceyspacey/react-universal-component#api-and-options
  return universal(page(), {
    ...defaultOptions,
    ...options
  });
}
