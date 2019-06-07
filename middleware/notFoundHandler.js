// sending page not found response when none of routes was matched
// @see: https://expressjs.com/en/4x/api.html#res.format

const notFoundHandler = () => (req, res) => {
  const code = 404;

  res.status(code);
  res.format({
    json() {
      res.send({ code, message: 'Resource not found.' });
    },
    html() {
      res.render('404', { code, message: 'Page not found.' });
    }
  });
};

export default notFoundHandler;
