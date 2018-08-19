import { DEV } from '@config';

// custom error handler for the app/api
// only include error stack in development mode
/* eslint no-unused-vars: 0 */
const errorHandler = ({ json = false } = {}) => (err, req, res, next) => {
  const code = err.statusCode || 500;
  const stack = DEV ? err.stack : null;
  const error = DEV ? err.message : 'Sorry! Something went wrong.';

  res.status(code);

  // giving erros in JSON format if request made via Ajax or `json` key is true
  // otherwise, rendering 500 template with passed params
  if (req.xhr || !!json) {
    res.json({ code, error, stack });
  } else {
    res.render('500', {
      code,
      error,
      stack
    });
  }

  // print error stack for terminal
  console.error(err.stack);
};

export default errorHandler;
