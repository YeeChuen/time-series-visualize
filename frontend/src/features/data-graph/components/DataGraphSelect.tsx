import { Select } from "antd";
import { useEffect, useState } from "react";
import {
  getRunClients,
  getRunTimeSeriesByRunClient,
} from "../../../lib/api/runClientApi";
import { TRunClient, TRunTimeSeries } from "../../../types";
import { useDataGraphContext } from "./DataGraphProvider";

const DataGraphSelect = () => {
  const [options, setOptions] = useState<
    { value: string; label: string }[] | undefined
  >();

  const { setRunTimeSeries } = useDataGraphContext() || {};

  useEffect(() => {
    const fetchRunClients = async () => {
      const data = await getRunClients();
      if (data.statusCode === 200) {
        // success request
        setOptions(
          data.runClients.map((client: TRunClient) => {
            return {
              value: client.id,
              label: client.clientName,
            };
          })
        );
      } else {
        console.error("Request failed:");
        console.error(data.message ? data.message : "Undefined error.");
      }
    };
    fetchRunClients();
  }, []);

  const onChange = (value: string) => {
    const fetchRunTimeSeriesByClient = async () => {
      const data = await getRunTimeSeriesByRunClient(value);
      if (data.statusCode === 200 && setRunTimeSeries) {
        setRunTimeSeries(
          data.runTimeSeries.map((runTimeSeries: TRunTimeSeries) => {
            return {
              id: runTimeSeries.id,
              runId: runTimeSeries.runId,
              timeStamp: runTimeSeries.timeStamp,
              parameter: runTimeSeries.parameter,
              processValue: runTimeSeries.processValue,
              units: runTimeSeries.units,
            };
          })
        );
      } else {
        console.error("Request failed:");
        console.error(data.message ? data.message : "Undefined error.");
      }
    };
    fetchRunTimeSeriesByClient();
  };

  return (
    <>
      Select client:{" "}
      <Select
        data-test="client-selecter"
        showSearch
        style={{ width: 200 }}
        placeholder="Select a client"
        optionFilterProp="label"
        onChange={onChange}
        options={options}
      />
    </>
  );
};

export default DataGraphSelect;
