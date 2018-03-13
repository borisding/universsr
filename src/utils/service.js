import axios from 'axios';
import extend from 'extend';
import isNode from 'detect-node';
import {
  protocol,
  host,
  port,
  apiVersion,
  requestBaseURL,
  requestTimeout
} from '@config/properties';

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
  async request(method, url, config) {
    try {
      return await this.axios.request({ method, url, ...config });
    } catch (err) {
      throw new Error(err);
    }
  }

  interceptRequest(resolve, reject) {
    return this.axios.interceptors.request.use(resolve, reject);
  }

  interceptResponse(resolve, reject) {
    return this.axios.interceptors.response.use(resolve, reject);
  }

  get(url, config) {
    return this.request(methods.get, url, config);
  }

  post(url, config) {
    return this.request(methods.post, url, config);
  }

  put(url, config) {
    return this.request(methods.put, url, config);
  }

  delete(url, config) {
    return this.request(methods.delete, url, config);
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
