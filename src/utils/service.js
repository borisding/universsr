import axios from 'axios';
import extend from 'extend';
import isNode from 'detect-node';
import { ready } from 'redux-ready-wrapper';
import {
  protocol,
  host,
  port,
  apiVersion,
  requestBaseURL,
  requestTimeout
} from '@config/properties';
import {
  errorCreator,
  infoCreator,
  successCreator
} from '@redux/middlewares/service-alert';

const methods = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete'
};

export default class Service {
  static create(axiosConfig = {}) {
    return new Service(axiosConfig);
  }

  constructor(axiosConfig) {
    if (typeof axiosConfig !== 'object') {
      throw new TypeError(
        'Invalid axios config. Expecting object data type to be provided.'
      );
    }

    this.axios = axios.create(
      extend(
        {
          baseURL: this.getBaseURL(),
          timeout: requestTimeout
        },
        axiosConfig
      )
    );
  }

  getBaseURL() {
    const api = `/api/${apiVersion}`;

    // use it if request base URL is explicitly defined (eg: domain name)
    if (requestBaseURL.trim()) {
      return `${requestBaseURL}${api}`;
    }

    // else, construct base URL based on platform
    return isNode ? `${protocol}://${host}:${port}${api}` : api;
  }

  // request config ref: https://github.com/axios/axios#request-config
  request(method, url, config, callback = data => data) {
    const {
      type,
      dispatchReady = true,
      error = {},
      info = {},
      success = {},
      ...restConfig
    } = config;

    const makeRequest = async dispatch => {
      try {
        const res = await this.axios.request({ method, url, ...restConfig });
        const action = await dispatch({ type, payload: callback(res.data) });

        info.message && dispatch(infoCreator(info));
        success.message && dispatch(successCreator(success));

        return action;
      } catch (err) {
        error.message && (err = error);
        dispatch(errorCreator(err));
      }
    };

    if (dispatchReady) {
      return ready(dispatch => makeRequest(dispatch), {
        isGet: method === methods.get
      });
    }

    return ({ dispatch }) => makeRequest(dispatch);
  }

  interceptRequest(resolve, reject) {
    return this.axios.interceptors.request.use(resolve, reject);
  }

  interceptResponse(resolve, reject) {
    return this.axios.interceptors.response.use(resolve, reject);
  }

  get(url, config, callback) {
    return this.request(methods.get, url, config, callback);
  }

  post(url, config, callback) {
    return this.request(methods.post, url, config, callback);
  }

  put(url, config, callback) {
    return this.request(methods.put, url, config, callback);
  }

  delete(url, config, callback) {
    return this.request(methods.delete, url, config, callback);
  }
}

// create default service instance and interceptors
// interceptors ref: https://github.com/axios/axios#interceptors
export const service = Service.create();

service.interceptRequest(
  config => {
    // we may do something here before request is sent
    return config;
  },
  err => Promise.reject(err)
);

service.interceptResponse(
  res => {
    // we may do something here before returning response data
    return res;
  },
  err => Promise.reject(err)
);
