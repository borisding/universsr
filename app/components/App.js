import React from 'react';
import { FrontloadProvider } from 'react-frontload';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';

export default function App({ frontloadState }) {
  return (
    <FrontloadProvider initialState={frontloadState}>
      {renderRoutes(routes)}
    </FrontloadProvider>
  );
}
