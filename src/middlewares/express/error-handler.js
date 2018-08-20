import { DEV } from '@config';
import { logger } from '@middlewares/express';

// custom error handler for the app/api
// only include error stack in development mode
/* eslint no-unused-vars: 0 */
const errorHandler = ({ json = false } = {}) => (err, req, res, next) => {
  const code = err.statusCode || 500;
  const stack = DEV ? err.stack : null;
  const error = DEV ? err.message : 'Sorry! Something went wrong.';
  const errorData = { code, error, stack };

  res.status(code);

  // giving erros in JSON format if request made via Ajax or `json` key is true
  // otherwise, rendering 500 template with passed params
  if (req.xhr || !!json) {
    res.json(errorData);
  } else {
    res.render('500', errorData);
  }

  return logger.exception(err);
};

export default errorHandler;
