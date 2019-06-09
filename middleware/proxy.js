import httpProxy from 'http-proxy';

// @see: https://github.com/nodejitsu/node-http-proxy#options
const origin = `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`;
const proxy = httpProxy.createProxyServer({
  target: `${origin}/api/${process.env.API_VERSION}`
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

  res.end(JSON.stringify({ code: err.code || 500, error: err.message }));
});

export default {
  proxyWeb
};
