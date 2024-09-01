import Papa from "papaparse";
import { ParseResult } from "papaparse";
import { TCsvObject } from "../types/csvObject";
import { TRunClient, TRunTimeSeries } from "../../../types";

export const parseCsv = async function (
  file: Blob,
  pump1_replace: string,
  pump2_replace: string
): Promise<TCsvObject | undefined> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target?.result;
      // You can now process the CSV data, for example, parse it
      resolve(processCsvData(csvData, pump1_replace, pump2_replace));
    };

    reader.readAsText(file);
  });
};

const capitalizeFirstLetter = (word: string) => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const processCsvData = (
  csvString: string | ArrayBuffer | null | undefined,
  pump1_replace: string,
  pump2_replace: string
): TCsvObject | undefined => {
  if (typeof csvString === "string") {
    let csvObj: TCsvObject;

    Papa.parse(csvString, {
      skipEmptyLines: true,
      complete: (result: ParseResult<string[]>) => {
        const arr = result.data
          .map((row) => row.filter((str) => str !== ""))
          .filter((arr) => arr.length > 0);
        // in this array, we know that
        // first row = client_name and run_id
        // second row == header
        // third row == start of data

        // getting client name and run id
        // assuming we follow the same format of <client_name>_<run_id>: <data collected>
        const [clientName, runId] = arr[0][0].split(":")[0].split("_");

        const runClientObj: TRunClient = {
          runId: runId,
          clientName: clientName,
        };

        const indexMap = [...arr[1]];
        const nameMap = indexMap.map((param) => {
          const jsName: string =
            param.split(" ")[0].toLowerCase() +
            param
              .split(" ")
              .slice(1)
              .map((part) => capitalizeFirstLetter(part))
              .join("");
          const obj: any = {};
          obj[jsName] = param;
          return obj;
        });

        csvObj = {
          runClient: runClientObj,
          runTimeSeries: [],
        };

        for (const item of arr.slice(2)) {
          const obj: any = {runId: runId};

          for (const nameMapObj of nameMap) {
            const jsNaming = Object.keys(nameMapObj)[0];
            const oriName = Object.values(nameMapObj)[0] as string;

            const value = item[indexMap.indexOf(oriName)]
            if (jsNaming === "timeStamp" || jsNaming === "processValue") {
              obj[jsNaming] = parseFloat(value);
            } else if (jsNaming === "parameter") {
              obj[jsNaming] = value.toLowerCase() == "pump1"
                          ? pump1_replace
                          : value.toLowerCase() == "pump2"
                          ? pump2_replace
                          : value
            } else {
              obj[jsNaming] = value;
            }
          }

          csvObj.runTimeSeries.push(obj);
        }

      },

      error: (error: any) => {
        console.error("Error parsing CSV:", error);
        csvObj = undefined;
      },
    });

    return csvObj;
  } else {
    return undefined;
  }
};
