import isDev from 'isdev';
import Alert from 'react-s-alert';

const REQUEST_ERROR = 'REQUEST_ERROR';
const REQUEST_INFO = 'REQUEST_INFO';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

export const errorCreator = error => ({
  type: REQUEST_ERROR,
  payload: error
});

export const infoCreator = info => ({
  type: REQUEST_INFO,
  payload: info
});

export const successCreator = success => ({
  type: REQUEST_SUCCESS,
  payload: success
});

export default () => store => next => action => {
  const { type, payload = {} } = action;
  let message = (payload && payload.message) || 'Unknown message.';

  switch (type) {
    case REQUEST_ERROR:
      if (!isDev && payload.response && payload.response.status >= 500) {
        message = 'Sorry! Request failure. Please try again later.';
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
