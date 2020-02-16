import proxy from 'http-proxy-middleware';

// @see: find more on https://github.com/chimurai/http-proxy-middleware
export default function httpProxy(options = {}) {
  return proxy({
    target: process.env.API_ORIGIN,
    changeOrigin: true,
    ...options
  });
}
