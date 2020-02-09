import axios from 'axios';
import isPlainObject from 'is-plain-object';
import { isNode } from '@config';

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
      timeout: parseInt(process.env.TIMEOUT, 10)
    };

    this.axios = axios.create({
      ...this.defaultConfig,
      ...this.axiosConfig
    });
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
    const api = `api/${process.env.API_VERSION}`;
    const origin = process.env.ORIGIN;
    const host = process.env.HOST || 'localhost';
    const port = parseInt(process.env.PORT, 10) || 3000;

    // use it if origin is explicitly defined (eg: domain name)
    if (origin) {
      return `${origin}/${api}`;
    }

    // construct base URL when is on server side
    if (isNode) {
      return `http://${host}:${port}/${api}`;
    }

    // or return as it is
    return `/${api}`;
  }

  interceptRequest(resolve, reject) {
    return this.axios.interceptors.request.use(resolve, reject);
  }

  interceptResponse(resolve, reject) {
    return this.axios.interceptors.response.use(resolve, reject);
  }

  delete(url, config) {
    return this.axios.delete(url, config);
  }

  get(url, config) {
    return this.axios.get(url, config);
  }

  post(url, data, config) {
    return this.axios.post(url, data, config);
  }

  put(url, data, config) {
    return this.axios.put(url, data, config);
  }

  patch(url, data, config) {
    return this.axios.patch(url, data, config);
  }
}

// create default service instance and interceptors
// @see: https://github.com/axios/axios#interceptors
export const service = Service.create();

service.interceptRequest(
  config => {
    // set the cookie header for server
    if (isNode && Service.req && Service.req.header) {
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
  err => {
    return Promise.reject(err.response && err.response.data);
  }
);
