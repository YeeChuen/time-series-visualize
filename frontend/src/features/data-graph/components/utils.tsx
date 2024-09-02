import { TRunTimeSeries } from "../../../types";

import {
  blue,
  green,
  lime,
  magenta,
  orange,
  purple,
  red,
  yellow,
} from "@ant-design/colors";

const colors = [red, yellow, green, blue, orange, lime, purple, magenta];


export const runTimeSeriesToData = (runTimeSeries: TRunTimeSeries[]) => {
  // whenever time series change AND it has content, we update the data and config
  const parametersUnits: any = {};
  const timeStampsParamValue: any = {};

  runTimeSeries.forEach((runTimeSeries: TRunTimeSeries) => {
    if (!parametersUnits.hasOwnProperty(runTimeSeries.parameter)) {
      parametersUnits[runTimeSeries.parameter] = runTimeSeries.units;
    }

    if (!timeStampsParamValue.hasOwnProperty(runTimeSeries.timeStamp)) {
      timeStampsParamValue[runTimeSeries.timeStamp] = {};
    }

    timeStampsParamValue[runTimeSeries.timeStamp][runTimeSeries.parameter] = {
      value: runTimeSeries.processValue ? runTimeSeries.processValue : 0,
    };
  });

  const data = [];
  const maxParam: any = {};

  for (const prop in timeStampsParamValue) {
    const obj: any = { timeStamp: prop };
    for (const param in parametersUnits) {
      if (!maxParam.hasOwnProperty(param)) {
        maxParam[param] = -Infinity;
      }
      maxParam[param] = Math.max(
        maxParam[param],
        timeStampsParamValue[prop][param].value
      );

      obj[param] = timeStampsParamValue[prop][param].value;
    }

    data.push(obj);
  }

  const configChildren = [];
  let colorIdx = 0;

  for (const param in parametersUnits) {
    configChildren.push({
      type: "line",
      yField: param,
      shapeField: "smooth",
      colorField: colors[colorIdx][5],
      scale: { y: { 
        domainMax: maxParam[param] /* Math.round(maxParam[param] / 10) * 10 */ 
    } }, //change max
      axis: {
        y: {
          position: colorIdx % 2 == 0 ? "right" : "left",
          title: `${param} (${parametersUnits[param]})`,
          style: { titleFill: colors[colorIdx][5] },
        },
      },
    });

    colorIdx = colorIdx + 1 < colors.length ? colorIdx + 1 : 0;
  }

  const config = {
    data,
    xField: "timeStamp", //change
    scale: { y: { nice: false } },
    children: configChildren,
  };

  return config
};
