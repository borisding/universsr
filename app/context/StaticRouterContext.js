import { createContext, useContext } from 'react';

const StaticRouterContext = createContext({});

export const useStaticRouterContext = () => useContext(StaticRouterContext);

export const StaticRouterProvider = ({ children, context }) => (
  <StaticRouterContext.Provider value={context}>
    {children}
  </StaticRouterContext.Provider>
);
