import axios from 'axios';
import { isObject } from '@utils';
import { ENV, NODE } from '@config';

export default class Service {
  static create(axiosConfig = {}) {
    return new Service(axiosConfig);
  }

  constructor(axiosConfig) {
    if (!isObject(axiosConfig)) {
      throw new TypeError(
        'Invalid axios config. Expecting object data type to be provided.'
      );
    }

    this.axios = axios.create({
      baseURL: this.getBaseURL(),
      timeout: ENV['REQUEST_TIMEOUT'],
      ...axiosConfig
    });
  }

  getBaseURL() {
    const api = `/api/${ENV['API_VERSION']}`;

    // use it if request base URL is explicitly defined (eg: domain name)
    if (ENV['REQUEST_BASEURL'].trim()) {
      return `${ENV['REQUEST_BASEURL']}${api}`;
    }

    // else, construct base URL based on platform
    return NODE
      ? `${ENV['PROTOCOL']}://${ENV['HOST']}:${ENV['PORT']}${api}`
      : api;
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
    if (NODE && service.req && service.req.header) {
      config.headers.Cookie = service.req.header('cookie') || '';
      service.req = null;
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
