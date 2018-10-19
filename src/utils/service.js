import axios from 'axios';
import isPlainObject from 'is-plain-object';
import { ENV, NODE } from '@config';

let req = null;

export default class Service {
  constructor(axiosConfig) {
    if (!isPlainObject(axiosConfig)) {
      throw new TypeError(
        'Invalid data type of axios config. It must be a plain object.'
      );
    }

    this.axiosConfig = axiosConfig;

    this.defaultConfig = {
      baseURL: this.getBaseURL(),
      timeout: ENV['REQUEST_TIMEOUT']
    };

    this.axios = axios.create(
      Object.assign({}, this.defaultConfig, this.axiosConfig)
    );
  }

  static create(axiosConfig = {}) {
    return new Service(axiosConfig);
  }

  static get req() {
    return req;
  }

  static set req(value) {
    req = value;
  }

  getBaseURL() {
    const api = `/api/${ENV['API_VERSION']}`;

    // use it if request base URL is explicitly defined (eg: domain name)
    if (ENV['REQUEST_BASEURL'].trim()) {
      return `${ENV['REQUEST_BASEURL']}${api}`;
    }

    // else, construct base URL when is on server side
    if (NODE) {
      return `${ENV['PROTOCOL']}://${ENV['HOST']}:${ENV['PORT']}${api}`;
    }

    // or return as it is
    return api;
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
// @see: https://github.com/axios/axios#interceptors
export const service = Service.create();

service.interceptRequest(
  config => {
    // set the cookie header for server
    if (NODE && Service.req && Service.req.header) {
      config.headers.Cookie = Service.req.header('cookie') || '';
      Service.req = null;
    }

    return config;
  },
  err => Promise.reject(err)
);

service.interceptResponse(
  res => {
    // we may do something here before returning response data
    return res;
  },
  // we may do something with response error
  // say, when user authentication failure occured
  err => Promise.reject(err)
);
