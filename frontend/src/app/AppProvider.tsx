import React, { createContext } from "react";

interface AppProviderProps {
  children?: React.ReactNode;
}

// currently not using any global context.
export const globalAppContext = createContext({});

const AppProvider = ({ children }: AppProviderProps) => {
  const value = {};

  return (
    <globalAppContext.Provider value={value}>
      {children}
    </globalAppContext.Provider>
  );
};

export default AppProvider;
