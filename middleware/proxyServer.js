import httpProxy from 'http-proxy';

// @see: https://github.com/nodejitsu/node-http-proxy#options
const apiHost = process.env.API_HOST || 'localhost';
const apiPort = process.env.API_PORT || 3030;
const origin = `http://${apiHost}:${apiPort}`;

const proxyServer = httpProxy.createProxyServer({
  target: `${origin}/api/${process.env.API_VERSION}`
});

const proxyWeb = (req, res) => {
  proxyServer.web(req, res);
};

proxyServer.on('error', (err, req, res) => {
  if (err.code !== 'ECONNRESET') {
    console.error('Proxy error:', err);
  }

  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  res.end(JSON.stringify({ code: err.code || 500, error: err.message }));
});

export default {
  proxyWeb
};
