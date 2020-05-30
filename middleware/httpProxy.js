import { createProxyMiddleware } from 'http-proxy-middleware';

// @see: find more on https://github.com/chimurai/http-proxy-middleware
export default function httpProxy(options = {}) {
  const { API_HOST, API_PORT } = process.env;
  const targetOrigin = `http://${API_HOST}:${API_PORT}`;

  return createProxyMiddleware({
    target: targetOrigin,
    changeOrigin: true,
    ...options
  });
}
