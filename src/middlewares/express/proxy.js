import httpProxy from 'http-proxy';
import { ENV } from '@config';

// @see: https://github.com/nodejitsu/node-http-proxy#options
const proxy = httpProxy.createProxyServer({
  target:
    `${ENV['API_PROTOCOL']}://${ENV['API_HOST']}:${ENV['API_PORT']}` +
    `/api/${ENV['API_VERSION']}`
});

const proxyWeb = (req, res) => {
  proxy.web(req, res);
};

proxy.on('error', (err, req, res) => {
  if (err.code !== 'ECONNRESET') {
    console.error('Proxy error:', err);
  }

  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  res.end(JSON.stringify({ error: 'proxy_error', reason: err.message }));
});

export default {
  proxyWeb
};
