import uuidv4 from 'uuid/v4';

const nonce = () => (req, res, next) => {
  res.locals.nonce = uuidv4();
  return next();
};

// helmet nonces ref: https://helmetjs.github.io/docs/csp/
const mount = helmet =>
  helmet.contentSecurityPolicy({
    directives: {
      styleSrc: [
        "'self'",
        'cdnjs.cloudflare.com',
        (req, res) => `'nonce-${res.locals.nonce}'`
      ],
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`]
    }
  });

export default {
  nonce,
  mount
};
