import axios from 'axios';

export default class Service {
  constructor(axiosConfig) {
    this.axiosConfig = axiosConfig;
    this.axios = axios.create({ ...this.axiosConfig });
  }

  static create(axiosConfig = {}) {
    return new Service(axiosConfig);
  }

  // @see: https://github.com/axios/axios#interceptors
  interceptRequest(...args) {
    return this.axios.interceptors.request.use(...args);
  }

  interceptResponse(...args) {
    return this.axios.interceptors.response.use(...args);
  }

  requestResolve(config = {}) {
    return config;
  }

  requestReject(error) {
    return Promise.reject(error);
  }

  // @see: https://github.com/axios/axios#response-schema
  responseResolve(response) {
    return response;
  }

  responseReject(error) {
    return Promise.reject(error);
  }

  httpRedirect(path) {
    if (typeof window !== 'undefined') {
      window.location.replace(path);
    }
  }

  // @see: https://github.com/axios/axios#instance-methods
  delete(...args) {
    return this.axios.delete(...args);
  }

  get(...args) {
    return this.axios.get(...args);
  }

  post(...args) {
    return this.axios.post(...args);
  }

  put(...args) {
    return this.axios.put(...args);
  }

  patch(...args) {
    return this.axios.patch(...args);
  }
}

// default service instance, config and interceptor handlers
export const getBaseURL = () => {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;
  const api = `api/${process.env.API_VERSION}`;
  const origin = `http://${host}:${port}`;

  return `${origin}/${api}`;
};

export const service = Service.create({
  baseURL: getBaseURL(),
  timeout: parseInt(process.env.REQUEST_TIMEOUT, 10)
});

service.interceptRequest(service.requestResolve, service.requestReject);
service.interceptResponse(service.responseResolve, service.responseReject);
