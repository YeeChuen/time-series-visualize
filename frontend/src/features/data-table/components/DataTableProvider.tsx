import React, { createContext, useContext, useState } from "react";
import { TRunTimeSeries } from "../../../types";

interface IDataTableContext {
  runTimeSeries: TRunTimeSeries[] | undefined;
  setRunTimeSeries: React.Dispatch<
    React.SetStateAction<TRunTimeSeries[] | undefined>
  >;
}

const dataTableContext = createContext<IDataTableContext | undefined>(
  undefined
);

interface DataTableProviderProps {
  children?: React.ReactNode;
}

const DataTableProvider = ({ children }: DataTableProviderProps) => {
  const [runTimeSeries, setRunTimeSeries] = useState<
    TRunTimeSeries[] | undefined
  >(undefined);

  const value = {
    runTimeSeries,
    setRunTimeSeries,
  };

  return (
    <dataTableContext.Provider value={value}>
      {children}
    </dataTableContext.Provider>
  );
};

// Custom hook to use the context
export const useDataTableContext = () => {
  const context = useContext(dataTableContext);
  if (!context) {
    console.error(
      "useDataTableContext must be used within a DataTableProvider"
    );
  }
  return context;
};

export default DataTableProvider;
