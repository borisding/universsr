import axios from 'axios';
import extend from 'extend';
import config from '@config/config.json';

const defaultConfig = {
  baseURL: `http://${config.host}:${config.port}/api/`,
  timeout: 3000
};

export default (userConfig = {}) => {
  return axios.create(extend(defaultConfig, userConfig));
};
