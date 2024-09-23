import Papa, { ParseResult } from "papaparse";
import { TRunProject } from "../../../types";
import { TCsvObject } from "../types/csvObject";

export const parseCsv = async function (
  file: Blob,
  // pump1_replace: string,
  // pump2_replace: string
): Promise<TCsvObject | undefined> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target?.result;
      // You can now process the CSV data, for example, parse it
      resolve(processCsvData(csvData, file as File));
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
  file: File,
  // pump2_replace: string
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
        // first row = project_name and run_id
        // second row == header
        // third row == start of data

        // getting project name and run id
        // assuming we follow the same format of <project_name>_<run_id>: <data collected>
        const [projectName, runId] = [file.name.split(".")[0], file.name.split(".")[0].split("_")[1]];

        const runProjectObj: TRunProject = {
          runId: runId,
          projectName: projectName,
        };

        const indexMap = [...arr[0]];
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
          runProject: runProjectObj,
          runTimeSeries: [],
        };

        for (const item of arr.slice(1)) {
          const obj: any = {runId: runId};

          for (const nameMapObj of nameMap) {
            const jsNaming = Object.keys(nameMapObj)[0];
            const oriName = Object.values(nameMapObj)[0] as string;

            const value = item[indexMap.indexOf(oriName)]
            if (jsNaming === "timeStamp" || jsNaming === "processValue") {
              obj[jsNaming] = parseFloat(value);
            } else if (jsNaming === "parameter") {
              obj[jsNaming] = value
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
