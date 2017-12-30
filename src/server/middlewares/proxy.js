const httpProxy = require('http-proxy');
const {
  apiProtocol,
  apiHost,
  apiPort,
  apiVersion
} = require('@config/properties');

const proxy = httpProxy.createProxyServer({
  target: `${apiProtocol}://${apiHost}:${apiPort}/api/${apiVersion}`
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

module.exports = {
  proxyWeb
};
