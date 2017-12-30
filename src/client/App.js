import React from 'react';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const App = ({ store, location, context }) => {
  return (
    <Provider store={store}>
      {isNode ? (
        <StaticRouter location={location} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      ) : (
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      )}
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  location: PropTypes.string,
  context: PropTypes.object
};

export default App;
