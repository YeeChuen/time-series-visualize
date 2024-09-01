import React from "react";
import DataTableSelect from "./DataTableSelect";
import DataTableTable from "./DataTableTable";
import DataTableProvider from "./DataTableProvider";

const DataTableContent = () => {
  return (
    <>
      <DataTableProvider>
        <DataTableSelect />
        <DataTableTable />
      </DataTableProvider>
    </>
  );
};

export default DataTableContent;
