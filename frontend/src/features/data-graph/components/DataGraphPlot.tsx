import React, { useEffect, useState } from "react";
import { DualAxes } from "@ant-design/plots";
import { Empty } from "antd";
import { useDataGraphContext } from "./DataGraphProvider";
import { runTimeSeriesToData } from "./utils";

const DataGraphPlot = () => {
  const { runTimeSeries } = useDataGraphContext() || {};

  //   const [data, setData] = useState(undefined);
  const [config, setConfig] = useState<any>(undefined);

  useEffect(() => {
    if (runTimeSeries) {
      if (runTimeSeries.length === 0) {
        return;
      }
      setConfig(runTimeSeriesToData(runTimeSeries));
    } else {
      return;
    }
  }, [runTimeSeries]);

  return (
    <div style={{ margin: "24px 0px" }}>
      {config && runTimeSeries !== undefined && runTimeSeries.length > 0 ? (
        // <>There's data</>
        <>
          <DualAxes {...config} />
          <p style={{ width: "100%", textAlign: "center" }}>
            Run client time series data
          </p>
        </>
      ) : (
        <Empty
          style={{ height: "100%" }}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );
};

export default DataGraphPlot;
