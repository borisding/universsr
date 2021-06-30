import logger from '../logger';
import { env } from '../../utils';

// custom error handler for the app/api
// only include error stack in development mode
// eslint-disable-next-line no-unused-vars
const errorHandler = () => (err, req, res, next) => {
  const code = err.status || 500;
  const message = err.message || 'Sorry! Something went wrong.';
  const stack = env.isDev ? err.stack : null;
  const errorData = { code, message, stack };

  res.status(code);

  // logs error stack
  logger.error(err.stack);

  // giving erros in JSON format if request made via Ajax
  // otherwise, rendering 500 template with passed params
  if (req.xhr) {
    res.json(errorData);
  } else {
    res.send('500 Internal Server Error.');
  }
};

export default errorHandler;
