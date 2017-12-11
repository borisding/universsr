import axios from 'axios';
import extend from 'extend';
import { apiBaseUrl, apiVersion } from '@config/index.json';

export const axiosFactory = (userConfig = {}) => {
  const config = extend(
    { baseURL: `${apiBaseUrl}/${apiVersion}`, timeout: 3000 },
    userConfig
  );

  return axios.create(config);
};

export default axiosFactory();
