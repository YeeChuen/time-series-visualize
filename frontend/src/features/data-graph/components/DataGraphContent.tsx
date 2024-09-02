import DataGraphPlot from "./DataGraphPlot";
import DataGraphProvider from "./DataGraphProvider";
import DataGraphSelect from "./DataGraphSelect";

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
