import { Button, Flex, Select } from "antd";
import { useEffect, useState } from "react";
import {
  deleteRunClient,
  getRunClients,
  getRunTimeSeriesByRunClient,
} from "../../../lib/api/runClientApi";
import { TRunClient, TRunTimeSeries } from "../../../types";
import { useDataTableContext } from "./DataTableProvider";

const DataTableSelect = () => {
  const [options, setOptions] = useState<
    { value: string; label: string }[] | undefined
  >();

  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  const { setRunTimeSeries } = useDataTableContext() || {};

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
        setDeleteId(value);
      } else {
        console.error("Request failed:");
        console.error(data.message ? data.message : "Undefined error.");
      }
    };
    fetchRunTimeSeriesByClient();
  };

  const onDelete = () => {
    const onDeleteRunClient = async () => {
      if (deleteId) {
        const data = await deleteRunClient(deleteId);
        if (data.statusCode === 200) {
          setDeleteId(undefined);
        } else {
          console.error("Request failed:");
          console.error(data.message ? data.message : "Undefined error.");
        }
      }
    };
    onDeleteRunClient();
  };

  return (
    <>
      <Flex justify="space-between">
        <div>
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
        </div>
        <Button danger disabled={deleteId === undefined} onClick={onDelete}>
          Delete client
        </Button>
      </Flex>
    </>
  );
};

export default DataTableSelect;
