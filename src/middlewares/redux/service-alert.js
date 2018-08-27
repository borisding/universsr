import Alert from 'react-s-alert';
import { DEV } from '@config';

export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_INFO = 'REQUEST_INFO';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

export const errorActionCreator = error => ({
  type: REQUEST_ERROR,
  payload: error
});

export const infoActionCreator = info => ({
  type: REQUEST_INFO,
  payload: info
});

export const successActionCreator = success => ({
  type: REQUEST_SUCCESS,
  payload: success
});

// eslint-disable-next-line no-unused-vars
export default () => store => next => action => {
  const { type, payload = {} } = action;
  let message = (payload && payload.message) || 'Unknown message.';

  switch (type) {
    case REQUEST_ERROR:
      if (!DEV && payload.response && payload.response.status >= 500) {
        // get production error message churned by error handler middleware, if any
        // or we just show the default production error message to end user instead
        const { error } = payload.response.data || {};
        message = error || 'Sorry! Request failure. Please try again later.';
      } else if (payload.code === 'ECONNABORTED') {
        message = 'Request Timeout! Please try again.';
      }

      Alert.error(message);
      break;
    case REQUEST_INFO:
      Alert.info(message);
      break;
    case REQUEST_SUCCESS:
      Alert.success(message);
      break;
    default:
    // do nothing
  }

  return next(action);
};
