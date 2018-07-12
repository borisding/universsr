import httpProxy from 'http-proxy';
import { API_PROTOCOL, API_HOST, API_PORT, API_VERSION } from '@config';

const proxy = httpProxy.createProxyServer({
  target: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/api/${API_VERSION}`
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
