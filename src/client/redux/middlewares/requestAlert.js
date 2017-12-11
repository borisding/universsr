import isDev from 'isdev';
import Alert from 'react-s-alert';

const REQUEST_ERROR = 'REQUEST_ERROR';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

export const errorCreator = error => ({
  type: REQUEST_ERROR,
  payload: error
});

export const successCreator = success => ({
  type: REQUEST_SUCCESS,
  payload: success
});

export default () => store => next => action => {
  const { type, payload = null } = action;
  let message = payload && payload.message;

  switch (type) {
    case REQUEST_ERROR:
      if (payload.response && payload.response.status >= 500 && !isDev) {
        message = 'Sorry! Something went wrong. Please try again later.';
      } else if (payload.code === 'ECONNABORTED') {
        message = 'Request Timeout!';
      }

      Alert.error(message);
      break;
    case REQUEST_SUCCESS:
      Alert.success(message);
      break;
    default:
    // do nothing
  }

  return next(action);
};
