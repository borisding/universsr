import axios from 'axios';

const defaultConfig = {
  baseURL: 'http://localhost:3000/api/',
  timeout: 3000
};

export default (userConfig = {}) => {
  return axios.create(Object.assign(defaultConfig, userConfig));
};
