import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const renderComponents = () => renderRoutes(routes);

const App = ({ isServer = false, location, context }) => {
  if (isServer) {
    return (
      <StaticRouter location={location} context={context}>
        {renderComponents()}
      </StaticRouter>
    );
  }

  return <BrowserRouter>{renderComponents()}</BrowserRouter>;
};

export default App;
