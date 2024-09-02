import { Table } from "antd";
import { TRunTimeSeries } from "../../../types";
import { useDataTableContext } from "./DataTableProvider";

const columns = [
  {
    title: "Run Id",
    dataIndex: "runId",
    key: "runId",
  },
  {
    title: "Time Stamp",
    dataIndex: "timeStamp",
    key: "timeStamp",
  },
  {
    title: "Parameter",
    dataIndex: "parameter",
    key: "parameter",
  },
  {
    title: "Process Value",
    dataIndex: "processValue",
    key: "processValue",
  },
  {
    title: "Units",
    dataIndex: "units",
    key: "units",
  },
];

const DataTableTable = () => {
  const { runTimeSeries } = useDataTableContext() || {};

  return (
    <div style={{ margin: "24px 0px" }}>
      <Table
        columns={columns}
        dataSource={
          !runTimeSeries
            ? runTimeSeries
            : runTimeSeries.map((runTimeSeries: TRunTimeSeries) => {
                return {
                  key: runTimeSeries.id,
                  runId: runTimeSeries.runId,
                  timeStamp: runTimeSeries.timeStamp,
                  parameter: runTimeSeries.parameter,
                  processValue: runTimeSeries.processValue,
                  units: runTimeSeries.units,
                };
              })
        }
      />
    </div>
  );
};

export default DataTableTable;
