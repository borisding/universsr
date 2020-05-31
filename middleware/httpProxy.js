import { createProxyMiddleware } from 'http-proxy-middleware';

const { API_HOST, API_PORT } = process.env;
const targetOrigin = `http://${API_HOST}:${API_PORT}`;

// @see: find more on https://github.com/chimurai/http-proxy-middleware
const httpProxy = (options = {}) =>
  createProxyMiddleware({
    target: targetOrigin,
    changeOrigin: true,
    ...options
  });

export default httpProxy;
