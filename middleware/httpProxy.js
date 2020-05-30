import { createProxyMiddleware } from 'http-proxy-middleware';

// @see: find more on https://github.com/chimurai/http-proxy-middleware
export default function httpProxy(options = {}) {
  return createProxyMiddleware({
    target: process.env.API_ORIGIN,
    changeOrigin: true,
    headers: {
      Connection: 'keep-alive'
    },
    ...options
  });
}
