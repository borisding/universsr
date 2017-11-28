import axios from 'axios';
import extend from 'extend';
import { apiBaseUrl } from '@config/index.json';

const defaultConfig = {
  baseURL: apiBaseUrl,
  timeout: 3000
};

export default (userConfig = {}) => {
  return axios.create(extend(defaultConfig, userConfig));
};
