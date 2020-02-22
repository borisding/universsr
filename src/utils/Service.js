import axios from 'axios';
import isPlainObject from 'is-plain-object';

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
      timeout: parseInt(process.env.REQUEST_TIMEOUT, 10)
    };

    this.axios = axios.create({
      ...this.defaultConfig,
      ...this.axiosConfig
    });
  }

  static create(axiosConfig = {}) {
    return new Service(axiosConfig);
  }

  getBaseURL() {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    const api = `api/${process.env.API_VERSION}`;
    const origin = `http://${host}:${port}`;

    return `${origin}/${api}`;
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
    return config;
  },
  err => Promise.reject(err)
);

service.interceptResponse(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err.response && err.response.data);
  }
);
