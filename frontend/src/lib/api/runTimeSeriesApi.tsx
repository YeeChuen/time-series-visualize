import { TRunTimeSeries } from "../../types";
import { apiVersion1 } from "../constants";

const url = `${apiVersion1}/run-time-series`;

export const createAllRunTimeSeries = (body: TRunTimeSeries[]) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // This tells the server you're sending JSON
    },
    body: JSON.stringify(body), // Convert the data to a JSON string
  };

  return fetch(url + "/batch", options)
    .then((response) => {
      const statusCode = response.status;
      return response.json().then((data) => {
        data.statusCode = statusCode;
        return data;
      });
    })
    .catch((error) => {
      return {
        statusCode: 400,
        status: "Error",
        message: error,
      };
    });
};
