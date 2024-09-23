import { Button, Flex, Select } from "antd";
import { useEffect, useState } from "react";
import {
  deleteRunProject,
  getRunProjects,
  getRunTimeSeriesByRunProject,
} from "../../../lib/api/runProjectApi";
import { TRunProject, TRunTimeSeries } from "../../../types";
import { useDataTableContext } from "./DataTableProvider";

const DataTableSelect = () => {
  const [options, setOptions] = useState<
    { value: string; label: string }[] | undefined
  >();

  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  const { setRunTimeSeries } = useDataTableContext() || {};

  useEffect(() => {
    const fetchRunProjects = async () => {
      const data = await getRunProjects();
      if (data.statusCode === 200) {
        // success request
        setOptions(
          data.runProjects.map((project: TRunProject) => {
            return {
              value: project.id,
              label: project.projectName,
            };
          })
        );
      } else {
        console.error("Request failed:");
        console.error(data.message ? data.message : "Undefined error.");
      }
    };
    fetchRunProjects();
  }, []);

  const onChange = (value: string) => {
    const fetchRunTimeSeriesByProject = async () => {
      const data = await getRunTimeSeriesByRunProject(value);
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
    fetchRunTimeSeriesByProject();
  };

  const onDelete = () => {
    const onDeleteRunProject = async () => {
      if (deleteId) {
        const data = await deleteRunProject(deleteId);
        if (data.statusCode === 200) {
          setDeleteId(undefined);
        } else {
          console.error("Request failed:");
          console.error(data.message ? data.message : "Undefined error.");
        }
      }
    };
    onDeleteRunProject();
  };

  return (
    <>
      <Flex justify="space-between">
        <div>
          Select project:{" "}
          <Select
            data-test="project-selecter"
            showSearch
            style={{ width: 200 }}
            placeholder="Select a project"
            optionFilterProp="label"
            onChange={onChange}
            options={options}
          />
        </div>
        <Button danger disabled={deleteId === undefined} onClick={onDelete}>
          Delete project
        </Button>
      </Flex>
    </>
  );
};

export default DataTableSelect;
