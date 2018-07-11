import axios from 'axios';
import extend from 'extend';
import isNode from 'detect-node';
import {
  PROTOCOL,
  HOST,
  PORT,
  API_VERSION,
  REQUEST_BASEURL,
  REQUEST_TIMEOUT
} from '@config/properties';

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
          timeout: REQUEST_TIMEOUT
        },
        axiosConfig
      )
    );
  }

  getBaseURL() {
    const api = `/api/${API_VERSION}`;

    // use it if request base URL is explicitly defined (eg: domain name)
    if (REQUEST_BASEURL.trim()) {
      return `${REQUEST_BASEURL}${api}`;
    }

    // else, construct base URL based on platform
    return isNode ? `${PROTOCOL}://${HOST}:${PORT}${api}` : api;
  }

  interceptRequest(resolve, reject) {
    return this.axios.interceptors.request.use(resolve, reject);
  }

  interceptResponse(resolve, reject) {
    return this.axios.interceptors.response.use(resolve, reject);
  }

  get(url, config) {
    return this.axios.get(url, config);
  }

  post(url, config) {
    return this.axios.post(url, config);
  }

  put(url, config) {
    return this.axios.put(url, config);
  }

  delete(url, config) {
    return this.axios.delete(url, config);
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
  // may have global response's error dispatcher for redux
  err => Promise.reject(err)
);
