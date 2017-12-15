const uuidv4 = require('uuid/v4');

const nonce = () => (req, res, next) => {
  res.locals.nonce = uuidv4();
  next();
};

// helmet nonces ref: https://helmetjs.github.io/docs/csp/
const register = helmet =>
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`]
    }
  });

module.exports = { nonce, register };
