import { Select } from "antd";
import { useEffect, useState } from "react";
import {
  getRunProjects,
  getRunTimeSeriesByRunProject,
} from "../../../lib/api/runProjectApi";
import { TRunProject, TRunTimeSeries } from "../../../types";
import { useDataGraphContext } from "./DataGraphProvider";

const DataGraphSelect = () => {
  const [options, setOptions] = useState<
    { value: string; label: string }[] | undefined
  >();

  const { setRunTimeSeries } = useDataGraphContext() || {};

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
      } else {
        console.error("Request failed:");
        console.error(data.message ? data.message : "Undefined error.");
      }
    };
    fetchRunTimeSeriesByProject();
  };

  return (
    <>
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
    </>
  );
};

export default DataGraphSelect;
