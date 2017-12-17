import axios from 'axios';
import extend from 'extend';
import { ready } from 'redux-ready-wrapper';
import { errorCreator, successCreator } from '@redux/middlewares/service-alert';
import { apiBaseUrl, apiVersion } from '@config/index.json';

export const instance = axiosFactory();
const initial = {};
const payload = data => data;
const methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

// create axios instance with provided config, if any
export function axiosFactory(userConfig = initial) {
  return axios.create(
    extend(
      { baseURL: `${apiBaseUrl}/${apiVersion}`, timeout: 3000 },
      userConfig
    )
  );
}

// make request for action creator based on the provided arguments
// callback could be, say, a provided normalizer function which returns normalized data
function makeRequest(
  method,
  url,
  { type, dispatchReady = true, success = initial, error = initial, ...config },
  callback = payload
) {
  const requestor = dispatch =>
    instance
      .request({ method, url, ...config })
      .then(res => dispatch({ type, payload: callback(res.data) }))
      .then(action => {
        success.message && dispatch(successCreator(success));
        return action;
      })
      .catch(err => {
        error.message && (err = error);
        dispatch(errorCreator(err));
      });

  if (dispatchReady) {
    return ready(dispatch => requestor(dispatch), {
      isGet: method === methods.GET
    });
  } else {
    return ({ dispatch }) => requestor(dispatch);
  }
}

// abstract away respective service requests and dispatchers
// request config ref: https://github.com/axios/axios#request-config
export default {
  get(url, config, callback) {
    return makeRequest(methods.GET, url, config, callback);
  },
  post(url, config, callback) {
    return makeRequest(methods.POST, url, config, callback);
  },
  put(url, config, callback) {
    return makeRequest(methods.PUT, url, config, callback);
  },
  delete(url, config, callback) {
    return makeRequest(methods.DELETE, url, config, callback);
  }
};
