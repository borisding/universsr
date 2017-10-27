import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const renderComponents = () => renderRoutes(routes);

const App = ({ isServer = false, location, context }) => {
  return isServer ? (
    <StaticRouter location={location} context={context}>
      {renderComponents()}
    </StaticRouter>
  ) : (
    <BrowserRouter>{renderComponents()}</BrowserRouter>
  );
};

App.propTypes = {
  isServer: PropTypes.bool,
  location: PropTypes.string,
  context: PropTypes.object
};

export default App;
