import DataTableProvider from "./DataTableProvider";
import DataTableSelect from "./DataTableSelect";
import DataTableTable from "./DataTableTable";

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
