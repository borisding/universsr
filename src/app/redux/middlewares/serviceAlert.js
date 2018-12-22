import Alert from 'react-s-alert';
import { DEV } from '@config';
import { requestTypes } from '@redux/ducks/request';

// eslint-disable-next-line no-unused-vars
export default () => store => next => action => {
  const { type, payload = {} } = action;
  let message = (payload && payload.message) || 'Unknown message.';

  switch (type) {
    case requestTypes.REQUEST_ERROR:
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
    case requestTypes.REQUEST_INFO:
      Alert.info(message);
      break;
    case requestTypes.REQUEST_SUCCESS:
      Alert.success(message);
      break;
    default:
    // do nothing
  }

  return next(action);
};
