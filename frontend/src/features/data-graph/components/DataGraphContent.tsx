import React from "react";
import DataGraphProvider from "./DataGraphProvider";
import DataGraphSelect from "./DataGraphSelect";
import DataGraphPlot from "./DataGraphPlot";

const DataGraphContent = () => {
  return (
    <>
      <DataGraphProvider>
        <DataGraphSelect />
        <DataGraphPlot />
      </DataGraphProvider>
    </>
  );
};

export default DataGraphContent;
