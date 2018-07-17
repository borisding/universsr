// https://github.com/expressjs/csurf
import csurf from 'csurf';

// config for CSRF, (default: cookie)
// usage: app.use(csrf())
const csrf = () => csurf({ cookie: true });

// make `csrfToken` accessible in view templates, conveniently
// usage: app.use(csrf.toLocal()), should come after csrf() is mounted
// later, we can print out <%= csrfToken %> in view template directly
csrf.toLocal = () => (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  return next();
};

export default csrf;
