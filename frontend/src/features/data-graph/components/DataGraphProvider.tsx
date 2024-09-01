import React, { createContext, useContext, useState } from "react";
import { TRunTimeSeries } from "../../../types";

interface IDataGraphContext {
  runTimeSeries: TRunTimeSeries[] | undefined;
  setRunTimeSeries: React.Dispatch<
    React.SetStateAction<TRunTimeSeries[] | undefined>
  >;
}

const dataGraphContext = createContext<IDataGraphContext | undefined>(
  undefined
);

interface DataGraphProviderProps {
  children?: React.ReactNode;
}

const DataGraphProvider = ({ children }: DataGraphProviderProps) => {
  const [runTimeSeries, setRunTimeSeries] = useState<
    TRunTimeSeries[] | undefined
  >(undefined);

  const value = {
    runTimeSeries,
    setRunTimeSeries,
  };

  return (
    <dataGraphContext.Provider value={value}>
      {children}
    </dataGraphContext.Provider>
  );
};

// Custom hook to use the context
export const useDataGraphContext = () => {
  const context = useContext(dataGraphContext);
  if (!context) {
    console.error(
      "useDataGraphContext must be used within a DataGraphProvider"
    );
  }
  return context;
};

export default DataGraphProvider;
